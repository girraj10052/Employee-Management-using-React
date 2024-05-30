import React, { useState, useEffect } from 'react';

const AverageCompanySalary = () => {
  const [employee, setEmployee] = useState([]);
  const [averageSalary, setAverageSalary] = useState(null);

  useEffect(() => {
    // Fetch the employee data
    fetch('/employee')
      .then(response => response.json())
      .then(data => {
        setEmployee(data);
        const avgSalary = calculateAverageSalary(data);
        setAverageSalary(avgSalary);
      });
  }, []);

  const calculateAverageSalary = (employee) => {
    if (employees.length === 0) {
      return 0; // Return 0 if no employees
    }

    const totalSalary = employee.reduce((acc, emp) => acc + emp.salary, 0);
    return totalSalary / employee.length;
  };

  return (
    <div>
      <h1>Average Salary of All Employees</h1>
      {averageSalary !== null && (
        <div>
          <h2>Average Salary: {averageSalary}</h2>
        </div>
      )}
    </div>
  );
};

export default AverageCompanySalary;
