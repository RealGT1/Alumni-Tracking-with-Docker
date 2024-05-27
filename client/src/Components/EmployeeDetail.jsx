import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [bio, setBio] = useState("");
  const [bioUpdated, setBioUpdated] = useState(false);
  const [showBioFields, setShowBioFields] = useState(false);
  const [showEditFields, setShowEditFields] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleUpdate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    axios
      .put(`http://localhost:3000/employee/update/${id}`, {
        name,
        email,
        salary,
      })
      .then((result) => {
        console.log(result.data);
        setShowEditFields(false);
        setEditCompleted(true);
        setTimeout(() => setEditCompleted(false), 3000);
        fetchEmployeeData();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordUpdate = () => {
    if (!showPasswordFields) {
      setShowPasswordFields(true);
    } else {
      axios
        .put(`http://localhost:3000/employee/updatePassword/${id}`, {
          oldPassword,
          newPassword,
        })
        .then((result) => {
          console.log(result.data);
          setShowPasswordFields(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchEmployeeData = () => {
    axios
      .get(`http://localhost:3000/employee/detail/${id}`)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleBioUpdate = () => {
    axios
      .put(`http://localhost:3000/employee/updateBio/${id}`, {
        bio,
      })
      .then((result) => {
        console.log(result.data);
        setBioUpdated(true);
        setTimeout(() => setBioUpdated(false), 3000);
        setShowBioFields(false);
        fetchEmployeeData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-10 py-2">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">

          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center ">
              <img src={`http://localhost:3000/Images/${employee.image}`} className="rounded-full w-full h-full object-cover" />
            </div>
            <div>
              <div>
                <p className="font-bold text-gray-700 text-xl">{employee.id}</p>
                <p className="text-gray-400">Alumni ID</p>
              </div>
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <Link to="/"><button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 h-12">HOME</button></Link>
            <Link to='/employeeForum'> <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 h-12">Message</button></Link>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-5xl font-medium text-gray-700">{employee.name} <span className="font-light text-gray-500">{employee.age}</span></h1>
          <p className="font-medium text-green-600 mt-3">{employee.category_name}, {employee.company}</p>


        </div>
        <div className="flex flex-col justify-center items-center ">
          <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white text-center mb-3">
                Profile
              </h4>
              <p className="mt-2 px-2 text-base text-gray-600 text-center">
                {employee.bio}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 px-2 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {employee.email}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Batch</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {employee.batch}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Department</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  Information Science
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">LinkedIn Profile</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {employee.linkedin}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Organization</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {employee.company}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Birthday</p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  20 July 1986
                </p>
              </div>


            </div>
          </div>

        </div>
        <div className="flex flex-col items-center p-5">

          <div className="flex justify-center space-x-4 p-4 h-0 items-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Update Bio
            </button>
            <button
              className="bg-red-500 text-white hover:bg-red-700 active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-gray-500 text-white hover:bg-gray-700 active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Update Password
            </button>
          </div>
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Update Bio
                        </h3>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="border-2 border-blue-500 px-8 py-2 rounded w-full mb-4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:items-center">
                    <button
                      onClick={() => {
                        handleBioUpdate();
                        setShowModal(false);
                      }}
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-red-600 text-white active:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {bioUpdated && (
            <p className="text-green-500">Bio updated successfully!</p>
          )}
          {showPasswordModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Update Password
                        </h3>
                        <div className="mt-2">
                          <input
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="border-2 border-blue-500 px-4 py-2 rounded w-full mb-4"
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border-2 border-blue-500 px-4 py-2 rounded w-full mb-4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:items-center">
                    <button
                      onClick={() => {
                        handlePasswordUpdate();
                        setShowPasswordModal(false);
                      }}
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:ml-3 sm:w-auto sm:text-sm"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowPasswordModal(false)}
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>


  );
};

export default EmployeeDetail;
