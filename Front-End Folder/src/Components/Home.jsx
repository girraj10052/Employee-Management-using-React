import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employee, setEmployee] = useState([]);
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [averageSalary, setAverageSalary] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [averageDepartmentSalary, setAverageDepartmentSalary] = useState(null);
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
    })
  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result => {
      if(result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const handleCalculateAverageSalary = () => {
    if (selectedCategory) {
      axios
        .get(`http://localhost:3000/auth/average_salary/${selectedCategory}`)
        .then((result) => {
           console.log(result);
          if (result.data.Status) {
            setAverageDepartmentSalary(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please select a department');
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          setAverageSalary(calculateAverageSalary(result.data.Result));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

      axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateAverageSalary = (employees) => {
    if (employees.length === 0) {
      return 0; // Return 0 if no employees
    }

    const totalSalary = employees.reduce((acc, emp) => acc + emp.salary, 0);
    return totalSalary / employees.length;
  };

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>₹ {salaryTotal}</h5>
          </div>
        </div>
      </div>

      <div className='mt-4 px-5 pt-3'>
     {averageSalary !== null && (
      <div className="justify-content-center mb-3">
        <h4>Average Salary of an employee in the company: ₹ {averageSalary.toFixed(1)}</h4>
        <hr/>
        <h4>Average Salary of department
          <select name="category" id="category" className="form-select w-25 m-3" value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select Department</option>
                {category.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            <button className="btn btn-primary" onClick={handleCalculateAverageSalary}>
                Calculate Average Salary
              </button>
              {averageDepartmentSalary !== null && (
                <div className="mt-3">
                  <h5>Average Salary in selected department: ₹ {averageDepartmentSalary}</h5>
                </div>
              )}
          </h4>
      </div>
    )}
    </div>
    </div>
  )
}

export default Home