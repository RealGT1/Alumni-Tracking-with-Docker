import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route, useNavigate, } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import AddAdmin from './Components/AddAdmin'
import HomePage from './Components/HomePage'
import EmployeeBio from './Components/EmployeeBio'
import Events from './Components/events'
import Events_Display from './Components/Events_Display'
import Forum from './Components/Forum'
import EmployeeForum from './Components/EmployeeForum'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/start' element={<Start />}></Route>
        <Route path="/employee/:id" element={<EmployeeBio />} />
        <Route path="/all_events" element={<Events_Display />} />
        <Route path='/employee/forum' element={<PrivateRoute ><Forum /></PrivateRoute>}></Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/employee_login' element={<EmployeeLogin />}></Route>
        <Route path='/employee_detail/:id' element={<PrivateRoute ><EmployeeDetail /></PrivateRoute>}></Route>
        <Route path='/employeeForum' element={<PrivateRoute ><EmployeeForum /></PrivateRoute>}></Route>
        <Route path='/dashboard' element={
          <PrivateRoute >
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/category' element={<Category />}></Route>
          <Route path='/dashboard/events' element={<Events />}></Route>
          <Route path='/dashboard/forum' element={<Forum />}></Route>
          <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
          <Route path='/dashboard/add_admin' element={<AddAdmin />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
