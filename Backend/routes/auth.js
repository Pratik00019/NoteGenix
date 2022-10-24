const { type } = require('@testing-library/user-event/dist/type');
const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/Users')

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Pratik"

//post method  is used bcz we dont want users to see the password in the link


//route for creating user
router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ errors: "A user exist with this email already" });
        }

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);

        // use to save the data in database

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });
        // .then(user => res.json(user)).catch(
        //     err => {
        //         console.log(err)
        //         res.json({ error: "You are having error" })
        //     }
        // );
        const data = {
            user: {
                id: user.id,
            }
        }

        var authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route for login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ erros: "Ivalid login credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ erros: "Ivalid login credentials" })
        }
    } catch (error) {
        res.status(500).send("Some error occured");
    }
    res.json({ hi: "logged in" })
})

// route for getting userdetails
//here fetch user is a middleware 
router.post('/getuser', fetchuser,
    async (req, res) => {
        try {
            userId=req.user.id
            const user= await User.findById(userId).select('-password');
            res.send(user)
        }

        catch (error) {
            res.status(500).send("Some error occured");
        }
     
    }
)

module.exports = router