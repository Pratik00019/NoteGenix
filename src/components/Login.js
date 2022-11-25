import { React, useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';



const Login = (props) => {
  useEffect(() => {
    // Update the document title using the browser API
    document.title="NoteGenix"
  });

  const { showalert } = props

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      showalert("Logged in successfully", "success")
      navigate("/");
    }
    else {
      showalert("Invalid Credentials", "danger")
    }
  }
  return (

    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://www.pngitem.com/pimgs/m/503-5038585_clip-art-take-note-note-taking-png-transparent.png' alt="login form" className='rounded-start w-100' />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">NoteGenix</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

              <MDBInput wrapperClass='mb-4' label='Email address' id='email' name='email' type='email' size="lg" onChange={onChange} />
              <MDBInput wrapperClass='mb-4' label='Password' id='password' name='password' type='password' size="lg" onChange={onChange} />
              <div className="login-box">
                <button type="button" className="btn btn-dark" size="lg" onClick={handleClick}>Login</button>
              </div>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/signup" style={{ color: '#393f81' }}>Register here</Link></p>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;