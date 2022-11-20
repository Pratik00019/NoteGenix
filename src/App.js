import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {

  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showalert={showalert}/>
          <Alert alert={alert}></Alert>
          <div className="container my-3">
            <Routes>
              <Route exact path="/about" element={<About />}>
              </Route>
              <Route exact path="/" element={<Home showalert={showalert} />}>
              </Route>
              <Route exact path="/login" element={<Login showalert={showalert} />}>
              </Route>
              <Route exact path="/signup" element={<Signup showalert={showalert}/>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
