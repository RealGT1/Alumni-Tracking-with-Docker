import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [admin, setAdmin] = useState({
    name: "", // Added name field
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(admin.email)) {
      alert("Please enter a valid email.");
      return;
    }

    axios
      .post("http://localhost:3000/auth/add_admin", admin)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard"); // navigate to /dashboard
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 w-72 border border-red-200 p-5 rounded-md shadow">
        <Link to="/dashboard" className=" ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        <label htmlFor="inputName" className="font-bold">Name</label>
        <input
          type="text"
          className="form-control rounded-none"
          id="inputName"
          placeholder="Enter Name"
          onChange={(e) =>
            setAdmin({ ...admin, name: e.target.value })
          }
        />

        <label htmlFor="inputEmail4" className="font-bold">Email</label>
        <input
          type="email"
          className="form-control rounded-none"
          id="inputEmail4"
          placeholder="Enter Email"
          autoComplete="off"
          onChange={(e) =>
            setAdmin({ ...admin, email: e.target.value })
          }
        />
        <label htmlFor="inputPassword4" className="font-bold">Password</label>
        <input
          type="password"
          className="form-control rounded-none"
          id="inputPassword4"
          placeholder="Enter Password"
          onChange={(e) =>
            setAdmin({ ...admin, password: e.target.value })
          }
        />
        <button type="submit" className="self-center shadow bg-slate-500 text-white px-5 py-2 rounded-md border-none cursor-pointer mt-4 transition-colors duration-300 hover:bg-slate-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;