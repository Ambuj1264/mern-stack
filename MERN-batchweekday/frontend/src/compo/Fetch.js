import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
function Fetch() {
    const [userData,setUserData]=useState([]);
    useEffect(()=>{
        fetchAll();
    },[]);

    const fetchAll=async()=>{
        let result=await fetch('http://localhost:5000/fetchAll',{
            headers:{
                       //authorization:"bearer "+sessionStorage.getItem('token')
              authorization:sessionStorage.getItem('token')
            }
           });
            result=await result.json();
            
                setUserData(result);
          
    }
    const deleted=async(id)=>{
       let deleteed_data=await fetch(`http://localhost:5000/delete/${id}`, {
        method: 'DELETE',
      });
      if(deleteed_data){
        fetchAll();
      }
    }
    return (
        <>
        <h1 className='text-center'>Fetch Users Data</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((val,ind)=>
                        <tr key={ind}>
                            <th scope="row">{ind+1}</th>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                            <td>{val.address}</td>
                            <td>{val.mobile}</td>
                            <td>
                                <Link to={"/update/"+val._id}> <button className='btn btn-warning' >Update</button></Link>
                                <button className='btn btn-danger' onClick={()=>deleted(val._id)}>Delete</button>
                            </td>
                        </tr>
                        )
                    }
                
                </tbody>
            </table>
        </>
    )
}

export default Fetch