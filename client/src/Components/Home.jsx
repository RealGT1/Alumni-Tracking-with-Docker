import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
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
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp)
        } else {
          alert(result.data.Error)
        }
      })
  }
  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      axios
        .delete("http://localhost:3000/auth/delete_admin", { data: { email } })
        .then((result) => {
          if (result.data.Status) {
            alert("Admin deleted successfully");
            // Filter out the deleted admin
            setAdmins(admins.filter(admin => admin.email !== email));
            // Decrement the admin total
            setAdminTotal(adminTotal - 1);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border rounded shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4 className='font-semibold text-2xl p-2'>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between p-2'>
            <h5 className='text-red-600 font-semibold text-xl'>Total:</h5>
            <h5 className='font-bold text-xl'>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border rounded shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4 className='font-semibold text-2xl p-2'>Alumni</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between p-2'>
            <h5 className='text-red-600 font-semibold text-xl'>Total:</h5>
            <h5 className='font-bold text-xl'>{employeeTotal}</h5>
          </div>
        </div>

      </div>
      <div className='mt-16 px-5 pt-3'>
        <h3 className=' font-semibold text-2xl mb-6'>List of Admins</h3>
        <Link to="/dashboard/add_admin" className="btn btn-success mb-6 ">
          Add Admin
        </Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr>
                  <td>{a.name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm" onClick={() => handleDelete(a.email)} >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home