import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
function PrivateComponent() {

const authToken=sessionStorage.getItem("token");
  return authToken? <Outlet/>:<Navigate to="/login"/>
}

export default PrivateComponent