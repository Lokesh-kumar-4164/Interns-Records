import { Routes, Route} from "react-router-dom"
import AddCandidate from "../pages/AddCandidate"
import AllCandidate from "../pages/AllCandidate"
import  LoginPage  from "../pages/Login"
import CreateUser from "../pages/CreateUser"
import ResetPassword from "../pages/UpdatePassword"
import UpdatePassword from "../pages/UpdatePassword"
const AppRoute = () =>{
  return(
<Routes>
  <Route path="/" element={<LoginPage/>}/>
  <Route path="/add-candidate" element={<AddCandidate/>}></Route>
  <Route path="/all-candidate" element={<AllCandidate/>}></Route>
  <Route path="/create-user" element={<CreateUser/>}></Route>
  <Route path="/reset-password" element={<ResetPassword/>}></Route>
  <Route path="/update-password" element={<UpdatePassword/>}></Route>
</Routes>
  )
}

export default AppRoute