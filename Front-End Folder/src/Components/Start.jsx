import axios from "axios";
import React, { useEffect } from "react";
import VideoBackground from './VideoBackground';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

useEffect

const Start = () => {
    const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('https://backend-or4n.onrender.com/verify')
    .then(result => {
      if(result.data.Status) {
        if(result.data.role === "admin") {
          navigate('/dashboard')
        } else {
          navigate('/employee_detail/'+result.data.id)
        }
      }
    }).catch(err =>console.log(err))
  }, [])

  return (
   <VideoBackground>
    <center>
     <div className="p-5">
     <div className="row p-5 rounded w-50 border loginForm">
      <div className="col-md-6">
        <h2>Employee Management System with React</h2>
        <p style={{textAlign: "justify"}}>An Employee Management System (EMS) is a web application designed to manage employee data, streamline HR tasks, and improve operational efficiency within an organization. 
          Using React for building an EMS brings the benefits of a robust, fast, and interactive user interface. 
          Below is a comprehensive overview of what an Employee Management System built with React could entail.</p>

      </div>
      <div className="col-md-6">
      <div className="d-flex justify-content-center align-items-center ">
      <div className="mt-5">
        <h2 className="text-center">Login As</h2>
        <div className="d-flex  justify-content-between mt-2 mb-2">
          <button type="button" className="btn btn-primary m-3" onClick={() => {navigate('/employee_login')}}>
          <i class="bi bi-person-badge-fill"></i>  Employee
          </button>
          <button type="button" className="btn btn-success m-3" onClick={() => {navigate('/adminlogin')}}>
          <i class="bi bi-exclamation-triangle-fill"></i>  Admin
          </button>
        </div>
      </div>
    </div>
          <span>Designed By:- Girraj Bihari Gupta</span>
      </div>
     </div>
     </div>
     </center>
   </VideoBackground>
  );
};

export default Start;
