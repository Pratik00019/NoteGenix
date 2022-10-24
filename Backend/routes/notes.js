const { type } = require('@testing-library/user-event/dist/type');
const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes')
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//fetching notes of user using get method
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

})

//adding notes of user using post method - user must be logged in for that
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 1 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

})

// Route 3 updating notes of the user using put method

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, tag, description } = req.body
    try {


        let newNote = {}

        if (title) { newNote.title = title }
        if (tag) { newNote.tag = tag }
        if (description) { newNote.description = description }

        //checking whether the id to update is in the database or not
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }

        //checking whether the correct user is updating it or not
        // note.user.toString() - It is value from database
        // req.user.id  - It is value that is generated from the fetchuser fucntion using the token
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

// Route for deleting the notes from database using delete method
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        //checking whether the id to delete is in the database or not
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }

        //checking whether the correct user is deleting it or not
        // note.user.toString() - It is value from database
        // req.user.id  - It is value that is generated from the fetchuser fucntion using the token
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted",note:note})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router