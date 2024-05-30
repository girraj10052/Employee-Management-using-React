import axios from "axios";
import React, { useEffect, useState } from "react";
import AddEmployee from './AddEmployee'
import { Link, useNavigate } from "react-router-dom";

const categoryName = {
  "1": "Information Technology",
  "2": "Sales",
  "3": "Backend Development",
  "4": "Business Development",
  "5": "Customer Service",
  "6": "Operations",
  "7": "Human Resources (HR)",
  "8": "Finance",
  "9": "Marketing",
  
}

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [averageSalary, setAverageSalary] = useState(null);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  

  useEffect(() => {
    axios
      .get("https://backend-or4n.onrender.com/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (searchValue.trim() === "") {
      // Fetch all employees if search term is empty
      axios.get("https://backend-or4n.onrender.com/auth/employee")
        .then((result) => {
          if (result.data.Status) {
            setEmployee(result.data.Result);
            console.log('Search result:', result); 
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
      return;
    }

    axios
      .get(`https://backend-or4n.onrender.com/auth/employee/search?q=%${searchValue}%`)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          console.log(result.data.Result);
        } else {
          alert(result.data.Error);
          
        }
      })
      .catch((err) => console.log(err));
  };


  const handleDelete = (id) => {
    axios.delete('https://backend-or4n.onrender.com/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 

  
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <div className="row">
        <div className="col-md-8 pt-4">
          <Link to="/dashboard/add_employee" className="btn btn-success">
            <i class="bi bi-person-plus-fill"></i> Add Employee
          </Link>
        </div>
        <div className="col-md-4">
          <form className="row g-3 mt-3">
              <div className="col-auto">
                <label htmlFor="searchEmployee" className="visually-hidden">Search</label>
                <input
                  type="text"
                  className="form-control"
                  id="searchEmployee"
                  placeholder="Search for an employee"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </form>
            </div>
      </div>
    
      <div className="mt-3">
      
        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e,idx) => (
              <tr key={idx}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`https://backend-or4n.onrender.com/Images/` + e.image}
                    className="employee_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{categoryName[e.category_id]}</td>
                <td>{e.address}</td>
                <td>{calculateAge(e.address)}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                   <i class="bi bi-pencil"></i> Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                  <i class="bi bi-trash"></i>  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
    
  );
};

export default Employee;
