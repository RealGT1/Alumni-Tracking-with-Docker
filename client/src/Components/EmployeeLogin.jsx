import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/employee/employee_login', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true)
                    navigate('/employee_detail/' + result.data.id)
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (

        <div class="flex flex-col h-screen bg-gray-100">

            <div class="grid place-items-center mx-2 my-20 sm:my-auto">

                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                px-6 py-10 sm:px-10 sm:py-6 
                bg-white rounded-lg shadow-md lg:shadow-lg">

                    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                        Login
                    </h2>
                    <div className='t mt-4 text-red-500 text-xl'>
                        {error && error}
                    </div>
                    <form class="mt-4" onSubmit={handleSubmit}>

                        <label for="email" class="block text-xs  text-gray-600 uppercase"><strong>Email:</strong></label>
                        <input id="email" type="email" name="email" placeholder="abc@gmail.com" autocomplete='off'
                            class="block w-full py-3 px-1 mt-2 
                        text-gray-800 appearance-none 
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            required />


                        <label for="password" class="block mt-2 text-xs f text-gray-600 uppercase"><strong>Password:</strong></label>
                        <input id="password" type="password" name="password" placeholder="Enter Password" autocomplete="off"
                            class="block w-full py-3 px-1 mt-2 mb-4
                        text-gray-800 appearance-none 
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            required />


                        <button
                            class="w-full py-3 mt-0 bg-gray-800 rounded-sm
                        font-medium text-white uppercase
                        focus:outline-none hover:bg-gray-700 hover:shadow-none">
                            Login
                        </button>


                        <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                            <a href="#" class="flex-2 underline">
                                Forgot password?
                            </a>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeeLogin