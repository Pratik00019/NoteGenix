import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

  const {showalert}=props

  const [credentials, setCredentials] = useState({name:"",email: "", password: "" });
  let navigate = useNavigate();
  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleClick = async (e) => {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password })
      });
      const json = await response.json()
      console.log(json)
      if (json.success) {
          localStorage.setItem('token', json.authtoken)
          navigate("/");
          showalert("Account Created Successully","success")
      }
      else {
        showalert("Invalid Details","danger");
      }
  }
  return (
    <div className="container">
      <form onSubmit={handleClick}>

      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required minLength={2}  />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label" >Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required minLength={0}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label" >Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="conpassword" name="conpassword" onChange={onChange} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup