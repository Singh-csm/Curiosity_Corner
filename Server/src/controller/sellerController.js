const sellerModel = require("../models/sellerModel");
const jwt = require('jsonwebtoken');


// route handler functioin to create or signup a new seller --
export const createseller = async function (req, res) {
    try {
        const data = req.body;
        if (Object.keys(data).length < 1) return res.status(404).send({ status: false, message: 'Please enter all required details to register a seller.' });

        const { fullName, number, email, password, gender } = data;

        // checking all required fields data -- 
        if (!fullName) return res.status(400).send({ status: false, message: 'Please enter full name to register a seller' });
        if (!number) return res.status(400).send({ status: false, message: 'Please enter mobile number to register a seller' });
        if (!email) return res.status(400).send({ status: false, message: 'Please enter email to register a seller' });
        if (!password) return res.status(400).send({ status: false, message: 'Please enter password to register a seller' });
        if (!gender) return res.status(400).send({ status: false, message: 'Please choose a gender to register a seller' });

        // validating all enterd fields data -- 


        // check duplicate email and password --
        const sellerExist = await sellerModel.findOne({ $or: [{ number: number }, { email: email }] });
        if (sellerExist) {
            if (sellerExist.number == number) return res.status(409).send({ status: false, message: 'seller already registered with this mobile number, Please use different mobile number' });
            if (sellerExist.email == email) return res.status(409).send({ status: false, message: 'seller alredy registered with this email, Please use a different email to register' });
        };

        // storing seller's details on database -- 
        const sellerCreated = await sellerModel.create({ data });
        res.status(201).send({ status: true, data: sellerCreated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};


// route handler function to login a seller -- 
export const loginseller = async function (req, res) {
    try {
        const data = req.body;
        if (Object.keys(data).length < 1) return res.status(404).send({ status: false, message: 'Please enter all required details to register a seller.' });

        const { email, password } = data;

        // checking all required fields data -- 
        if (!email) return res.status(400).send({ status: false, message: 'Please enter email to register a seller' });
        if (!password) return res.status(400).send({ status: false, message: 'Please enter password to register a seller' });

        const sellerLogeedIn = await sellerModel.findOne({ email: email, password: password });

        if (!sellerLogeedIn) return res.status(400).send({ status: false, message: 'Email or password is incorrect, please provide valid email and password' });

        const payload = {
            name: sellerLogeedIn.name,
            email: sellerLogeedIn.email
        };

        const token = jwt.sign(payload, 'key');

        return res.status(200).send({ status: true, data: sellerLogeedIn, token: token });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};