const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');


// route handler functioin to create or signup a new user --
export const createUser = async function (req, res) {
    try {
        const data = req.body;
        if (Object.keys(data).length < 1) return res.status(404).send({ status: false, message: 'Please enter all required details to register a user.' });

        const { fullName, number, email, password, gender } = data;

        // checking all required fields data -- 
        if (!fullName) return res.status(400).send({ status: false, message: 'Please enter full name to register a user' });
        if (!number) return res.status(400).send({ status: false, message: 'Please enter mobile number to register a user' });
        if (!email) return res.status(400).send({ status: false, message: 'Please enter email to register a user' });
        if (!password) return res.status(400).send({ status: false, message: 'Please enter password to register a user' });
        if (!gender) return res.status(400).send({ status: false, message: 'Please choose a gender to register a user' });

        // validating all enterd fields data -- 


        // check duplicate email and password --
        const userExist = await userModel.findOne({ $or: [{ number: number }, { email: email }] });
        if (userExist) {
            if (userExist.number == number) return res.status(409).send({ status: false, message: 'User already registered with this mobile number, Please use different mobile number' });
            if (userExist.email == email) return res.status(409).send({ status: false, message: 'User alredy registered with this email, Please use a different email to register' });
        };

        // storing user's details on database -- 
        const userCreated = await userModel.create({ data });
        res.status(201).send({ status: true, data: userCreated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};


// route handler function to login a user -- 
export const loginUser = async function (req, res) {
    try {
        const data = req.body;
        if (Object.keys(data).length < 1) return res.status(404).send({ status: false, message: 'Please enter all required details to register a user.' });

        const { email, password } = data;

        // checking all required fields data -- 
        if (!email) return res.status(400).send({ status: false, message: 'Please enter email to register a user' });
        if (!password) return res.status(400).send({ status: false, message: 'Please enter password to register a user' });

        const userLogeedIn = await userModel.findOne({ email: email, password: password });

        if (!userLogeedIn) return res.status(400).send({ status: false, message: 'Email or password is incorrect, please provide valid email and password' });

        const payload = {
            name: userLogeedIn.name,
            email: userLogeedIn.email
        };

        const token = jwt.sign(payload, 'key');

        return res.status(200).send({ status: true, data: userLogeedIn, token: token });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};