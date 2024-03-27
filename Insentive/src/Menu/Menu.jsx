import React from 'react'

import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import LoginPage from '../components/LoginPage'
import NewAdmin from '../components/NewAdmin'
import NewUser from '../components/NewUser'
import ForgotPassword from '../components/ForgotPassword'
import IncentiveDisplay from '../components/IncentiveDisplay'
// import USerInsentive_View from '../components/UerInsentiveView'
import UserInsentiveView from '../components/UerInsentiveView'
import EmployeeForm from '../components/EmployeeForm'
// import UpdateHoliday from '../components/UpdateHoliday'
import HolidayPackage from '../components/HolidayPackage'

function Menu() {
  return (
   <Router>
    <Link to='/'></Link>
    <Link to="/insentiveDisp"></Link>
    {/* <Link to="/userView"></Link> */}
  
     <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        {/* <Route path='/newadmin' element={<NewAdmin/>}></Route> */}
        <Route path='/newuser' element={<NewUser/>}></Route>
        <Route path='/forgotpass' element={<ForgotPassword/>}></Route>
        <Route path='/insentiveDisp' element={<IncentiveDisplay/>}></Route>
        {/* <Route path='/userView' element={<UserInsentiveView/>}></Route> */}
        <Route path='/userView/:id' element={<UserInsentiveView />} />

        <Route path='/Empform' element={<EmployeeForm/>}></Route>
        <Route path='/update/:id' element={<HolidayPackage/>}></Route>
     </Routes>



   </Router>
  )
}

export default Menu
