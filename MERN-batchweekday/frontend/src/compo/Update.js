import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Register() {
    const params=useParams();
   // console.log(params.id)
    const [state, setState] = useState({
        name: "", email: "", mobile: "", address: "", password: "", conpassword: ""
    })
    useEffect(()=>{
        getDetails();
    },[]);
    const getDetails=()=>{
        fetch(`http://localhost:5000/update/${params.id}`)
        .then(res=>res.json())
        .then(da=>setState(da))
        .catch(()=>console.log("api call error"))
    }
    const [nameMessage, setNameMessage] = useState("")
    const [emailMessage, setEmailMessage] = useState("")
    const [mobileMessage, setMobileMessage] = useState("")
    const [addressMessage, setAddressMessage] = useState("")
    const [passwordMessage, setPasswordMessage] = useState("")
    const [conpasswordMessage, setConPasswordMessage] = useState("")
    const handler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const submitData = async () => {
        const { name, email, mobile, address, password, conpassword } = state
        var nameExp = /^[a-zA-Z\s]+$/;
        const emailRegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const mobileRegExp = /^[0-9]*$/;
        const addressRegExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        const passwordRegExp = /^[a-zA-Z]\w{3,14}$/;
        const conpasswordRegExp = /^[a-zA-Z]\w{3,14}$/;
        ///////name validation//////////////
        if (name === "") {
            setNameMessage("Name field is not blank");
            return false
        }
        else if (!nameExp.test(name)) {
            setNameMessage("Name should be alphabet Only")
            return false
        }
        else {
            setNameMessage("")
        }
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
        ////////mobile validation///////////////

        if (mobile === "") {
            setMobileMessage("Mobile field is not blank")
            return false
        }
        else if (!mobileRegExp.test(mobile)) {
            setMobileMessage("Mobile No. is not valid")
            return false
        }
        else if (mobile.length < 10 || mobile.length > 12) {
            //alert("Your Mobile No. should be between 10 to 12 in length");
            setMobileMessage("Your Mobile No. should be between 10 to 12 in length")
            return false;
        }

        else {
            setMobileMessage("")
        }
        /////////address validation////////////////////////
        if (address === "") {
            setAddressMessage("Address field is not blank")
            return false
        }
        else if (!addressRegExp.test(address)) {
            setAddressMessage("Address is not valid")
            return false
        }
        else {
            setAddressMessage("")
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
        ///////////password Validation//////////////////////
        if (conpassword === "") {
            setConPasswordMessage("Confirm Password field is not blank")
            return false
        }
        else if (!conpasswordRegExp.test(conpassword)) {
            setConPasswordMessage("Confirm Password is not valid");
            return false
        }
        else {
            setConPasswordMessage("");
        }
        ///////////////to update data/////////////////////////
        if (password === conpassword) {
            fetch(`http://localhost:5000/update/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, email, mobile, address, password, conpassword }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch(()=>console.log("Api Call Error"))
            document.getElementById("result").innerHTML = "Update Success";
            
            setState({
                name: "", email: "", mobile: "", address: "", password: "", conpassword: ""
            })
        }
        else {
            document.getElementById("result").innerHTML = "Your Password and Confirm Password is not match"
        }



    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h1 className='text-center'>Update Details Here</h1>
                    <div className='col-sm-8 col-md-8 mx-auto'>
                        Name:<input
                            type="text"
                            name="name"
                            className='form-control my-3'
                            placeholder="Your Name"
                            value={state.name}
                            onChange={handler}

                        />
                        <div style={{ color: "red" }}>{nameMessage}</div>
                        Email:<input
                            type="email"
                            name="email"
                            className='form-control my-3'
                            placeholder="Your Email Id"
                            value={state.email}
                            onChange={handler}

                        />
                        <div style={{ color: "red" }}>{emailMessage}</div>

                        Mobile:<input
                            type="number"
                            name="mobile"
                            className='form-control my-3'
                            placeholder="Your Mobile"
                            value={state.mobile}
                            onChange={handler}
                        />
                        <div style={{ color: "red" }}>{mobileMessage}</div>

                        Address:<textarea
                            className='form-control my-3'
                            placeholder='Your Address'
                            name='address'
                            value={state.address}
                            onChange={handler}
                        >
                        </textarea>
                        <div style={{ color: "red" }}>{addressMessage}</div>
                        Password:<input
                            type="password"
                            name="password"
                            className='form-control my-3'
                            placeholder="Your Password"
                            value={state.password}
                            onChange={handler}
                        />
                        <div style={{ color: "red" }}>{passwordMessage}</div>
                        Confirm Password:<input
                            type="password"
                            name="conpassword"
                            className='form-control my-3'
                            placeholder="Your Confirm Password"
                            value={state.conpassword}
                            onChange={handler}
                        />
                        <div style={{ color: "red" }}>{conpasswordMessage}</div>
                        <button
                            className='btn btn-primary'
                            type='button'
                            onClick={submitData}
                        >Update</button>
                        <h2 id="result"> </h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register