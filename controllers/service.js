const User = require('../models/user');
const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Permission = require('../models/permissionLetter')

const register = async (req, res) => {
    const { fullname, department, password, email, userType } = req.body;
    if (!email || !fullname || !password) {
        console.log('Please add all the fields');
        return res.status(422).json({ error: "Please add all the fields" });
    }

    try {
        const existingUser = await User.findOne({ $and: [{ userType: userType }, { department: department }] });

        if (existingUser) {
            console.log('User already exists!');
            return res.status(422).json({ error: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullname,
            department,
            email,
            userType,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(200).json({
            message: "Registered Successfully",
            userId: newUser._id.toString(),
        });
    }
    catch (err) {
        return res.status(500).json({ error: `Internal server error: ${err}` });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please provide a valid email and password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(422).json({ error: "Invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const secretKey = process.env.JWT_SECRET_KEY || 'yourDefaultSecretKey';
            const token = jwt.sign({ _id: user.id }, secretKey);

            return res.status(200).json({
                user: user,
                message: "Login successful",
                token,
            });
        } else {
            return res.status(404).json({ error: "Invalid Credentials!!!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const teachers = async (req, res) => {
    try {
        const teachers = await User.find({ userType: "teacher" });
        return res.status(200).json({ data: teachers })
    }
    catch (err) {
        return res.status(500).json({ error: "Interval Server Error" });
    }
}

const event = async (req, res) => {
    const { StartTime, EndTime, Subject, IsAllDay } = req.body;
    if (!StartTime || !EndTime || !Subject || !IsAllDay) {
        console.log('Please add all the fields');
        return res.status(422).json({ error: "Please add all the fields" });
    }
    try {
        const event = new Event({
            StartTime,
            EndTime,
            Subject,
            IsAllDay,
        });

        await event.save();
        return res.status(200).json({ event });
    }
    catch (err) {
        return res.status(500).json({ error: "Interval Server Error " + err });
    }
}

const eventsList = async (req, res) => {
    try {
        const student = await User.findById(req.userID);
        const ids = student.hosted;
        const data = ids.map(permission => permission._id);
        const allEvent = await Permission.find({_id:data});
        return res.status(200).json({ allEvent });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error "+err });
    }
}

const eventListForCalender = async(req,res)=>{
    try{
        const event = await Event.find({});
        return res.status(200).json({data : event});
    }
    catch(err){
        return res.status(500).json({error:"Internal Server Error "+err})
    }
}

const singleEvent = async(req,res)=>{
    const {id} = req.query;
    try{
        const event = await Permission.findById(id);
        return res.status(200).json({data : event});
    }
    catch(err){
        return res.status(500).json(`Some Error Occured: ${err.message}`)
    }
}

const permit = async (req, res) => {
    const permissionId = req.params.id;
    const { email } = req.user;

    try {
        const updatedPermission = await Permission.findById(permissionId);
        const permissionFrom = updatedPermission.permissionFrom;

        const userEmail = permissionFrom.find(item => item.email === email);
        if (userEmail) {
            userEmail.permitted = true;
            await updatedPermission.save();
            const allPermitted = permissionFrom.every(email => email.permitted === true);
            const {eventName,eventType,startTime,endTime,isAllDay} = updatedPermission;
            let event;
            if (allPermitted) {
                event = new Event({
                    Subject: eventName + ' ' + eventType,
                    EndTime : endTime,
                    StartTime: startTime,
                    IsAllDay:isAllDay,
                });
                await event.save();
            }
            return res.status(200).json({ message: 'Permission granted for email: ' + email , event });
        } else {
            return res.status(404).json({ error: 'Email not found in permissionFrom array' });
        }

    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error ' + err });
    }
}

module.exports = { register, login, teachers, event, eventsList, permit,eventListForCalender,singleEvent };