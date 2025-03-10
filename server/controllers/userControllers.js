const user = require("../model/userModel");
const bcrypt = require('bcrypt')

const register = async (req,res) => {
    try {
        const {name, email, age, password} = req.body;

        //All fields required
        if(!name || !email || !password || !age)
        {
            return res.status(400).json({error: "All fields are required"})
        }

       // Email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format"});
        }

        //Age must be positive
        if(age < 1) 
        {
            return res.status(400).json({ error: "Age must be a positive value"});
        }

        //Password hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)

        const newUser = new user({name, email, password: hashedPassword, age})
        const savedUser = await newUser.save()
        res.status(201).json({message: "User created", savedUser})

    } catch (error) {
        if(error.code==11000) {
            return res.status(400).json({error: "Email already exists"})
        }
        res.status(error.status || 500).json({error: error.message || "Internal server error"})

    }
}

module.exports = {
    register
}