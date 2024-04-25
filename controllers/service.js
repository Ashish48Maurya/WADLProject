const User = require('../models/user')
const Form = require('../models/permissionLetter')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


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


module.exports = { register, login, teachers };