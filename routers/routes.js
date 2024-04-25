const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const service = require('../controllers/service');
const fs = require('fs');
const User = require('../models/user')
const Permission = require('../models/permissionLetter')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secureConnection: false,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GPASSWORD
    }
});

router.post('/register', service.register);
router.post('/login', service.login)

router.post('/permission', authMiddleware(), upload.single('file'), async (req, res) => {
    const { eventType, eventName, teamSize, noOfTeams, outSiders, supervisor, permissionFrom } = req.body;
    const userId = req.userID;
    const Student = await User.findById(userId);

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    console.log(permissionFrom)
    const permissionFromArray = permissionFrom.split(',');
    try {
        const event = new Permission({
            eventType,
            eventName,
            url: newPath,
            teamSize,
            noOfTeams,
            outSiders,
            supervisor,
            permissionFrom: permissionFromArray.map(email => ({ email, permitted: false }))
        });

        const Faculty = await User.find({ email: { $in: permissionFromArray } });

        if (Faculty.length === 0) {
            return res.status(404).json({ error: 'No Faculty found With the specified Email' });
        }

        for (const faculty of Faculty) {
            faculty.requests.push(event._id);
            await faculty.save();
        }

        const info = await transporter.sendMail({
            from: process.env.GMAIL,
            to: permissionFromArray,
            title: "Permission For Conducting Event",
            subject: `http://localhost:3000/event/${event._id}`
        });
        await event.save();
        Student.hosted.push(event);
        await Student.save();
        return res.status(200).json({ data: event });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})


router.get('/teachers', service.teachers)

router.get('/Get', authMiddleware(), (req, res) => {
    return res.send(`Hello ${req.user.fullname}`)
})

module.exports = router;