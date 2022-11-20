import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  // This file provides the state to an entire file  because contextAPI is used

  const notesinital = []

  const port = "http://localhost:5000";
  const [notes, setNotes] = useState(notesinital)

  const fetchallnotes = async () => {
    const response = await fetch(`${port}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    setNotes(json)

  }

  
  const addNote = async (title, description, tag) => {
    
    const response = await fetch(`http://localhost:5000/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note =await response.json()
    setNotes(notes.concat(note))
  }


  const deleteNote = async (id) => {

    //API CALL
    const response = await fetch(`${port}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    //Delete Note method

    //
    const newnotes = notes.filter((note) => { return note._id !== id });
    setNotes(newnotes)
    
  }


  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${port}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)

    const newnotes=await JSON.parse(JSON.stringify(notes))

    //Edit Note Method
    for (let index = 0; index < notes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title
        newnotes[index].description = description
        newnotes[index].tag = tag
        break;
      }
    }
    setNotes(newnotes)
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchallnotes }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState