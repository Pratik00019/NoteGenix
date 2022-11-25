import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    

    const { showalert } = props

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleClick = async (e) => {
        console.log("jii");
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            showalert("Account Created Successully", "success")
        }
        else {
            showalert("Invalid Details", "danger");
        }
    }
    return (
        <>
        <div className="container">
        <div className='light x1'></div>
            <div className='light x2'></div>
            <div className='light x3'></div>
            <div className='light x4'></div>
            <div className='light x5'></div>
            <div className='light x6'></div>
            <div className='light x7'></div>
            <div className='light x8'></div>
            <div className='light x9'></div>
            <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
                <MDBRow>
                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                            The best website <br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>to save your notes</span>
                        </h1>

                        <p className='px-2' style={{ color: 'hsl(218, 81%, 85%)' }}>
                            Welcome , Get ready to save your important notes without being afraid of getting your notes viewed by others.
                        </p>

                    </MDBCol>

                    <MDBCol md='6' className='position-relative'>

                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <MDBCard className='my-5 bg-glass'>
                            <MDBCardBody className='p-5'>

                                <MDBRow>
                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='Full name' id='name' name='name' type='text' onChange={onChange} />
                                    </MDBCol>

                                </MDBRow>

                                <MDBInput wrapperClass='mb-4' label='Email' id='email' name='email' type='email' onChange={onChange} />
                                <MDBInput wrapperClass='mb-4' label='Password' id='password' name='password' type='password' onChange={onChange} />



                                <button type="button" className="btn btn-primary" size="lg" onClick={handleClick}>Sign Up</button>


                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </div>
        </>
    );
}

export default Signup;