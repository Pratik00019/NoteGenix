import { React, useContext } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import noteContext from '../context/notes/noteContext'



library.add(fas, faTwitter, faFontAwesome)


const Noteitem = (props) => {
    const { note,updateNote } = props
    
    const context = useContext(noteContext)
    const {deleteNote} = context

    return (
        <div className='col-md-4'>
            <div className="card my-3 ">

                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title my-1">  {note.title}</h5>&nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={()=>deleteNote(note._id)} />&nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon="fa-solid fa-file-pen" style={{ cursor: "pointer" }} onClick={()=>{updateNote(note)}} />
                    </div>
                    <p className="card-text">{note.description}</p>

                    {/* <FontAwesomeIcon icon="fa-regular fa-pen-to-square" /> */}
                </div>
            </div>
        </div>
    )
}

export default Noteitem