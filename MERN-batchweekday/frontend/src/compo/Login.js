import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate=useNavigate();
    const [state, setState] = useState({
        email: "", password: ""
    })

    const [emailMessage, setEmailMessage] = useState("")
    const [passwordMessage, setPasswordMessage] = useState("")
    const handler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const submitData = async () => {
        const { email, password } = state
        const emailRegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const passwordRegExp = /^[a-zA-Z]\w{3,14}$/;
        //////////email validation//////////////////
        if (email === "") {
            setEmailMessage("Email field is not blank")
            return false
        }
        else if (!emailRegExp.test(email)) {
            setEmailMessage("Email is not valid")
            return false
        }
        else {
            setEmailMessage("")
        }
        ///////////password Validation//////////////////////
        if (password === "") {
            setPasswordMessage("Password field is not blank")
            return false
        }
        else if (!passwordRegExp.test(password)) {
            setPasswordMessage("Your password sholud be first latter or 4 to 15 charecter only")
            return false
        }
        else {
            setPasswordMessage("")
        }
    /////////////login functionality////////////
    if(email && password)
    {
        let result=await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let data=await result.json();
        if(data.userEmail)
        {
            sessionStorage.setItem("email",data.userEmail.email)
            sessionStorage.setItem("token",data.token)
            navigate("/fetchAll")
        }
        else{
            alert("Try Again with correct credential")
        }

    }
    else{
        alert("All field is required")
    }





    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h1 className='text-center'>Login Here</h1>
                    <div className='col-sm-8 col-md-8 mx-auto'>
                        Email:<input
                            type="email"
                            name="email"
                            className='form-control my-3'
                            placeholder="Your Email Id"
                            value={state.email}
                            onChange={handler}

                        />
                        <div style={{ color: "red" }}>{emailMessage}</div>
                        Password:<input
                            type="password"
                            name="password"
                            className='form-control my-3'
                            placeholder="Your Password"
                            value={state.password}
                            onChange={handler}
                        />
                        <div style={{ color: "red" }}>{passwordMessage}</div>
                        <button
                            className='btn btn-primary'
                            type='button'
                            onClick={submitData}
                        >Login</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login