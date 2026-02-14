import { Routes, Route} from "react-router-dom"
import AddCandidate from "../pages/AddCandidate"
import AllCandidate from "../pages/AllCandidate"
import  LoginPage  from "../pages/Login"
import CreateUser from "../pages/CreateUser"
import ResetPassword from "../pages/UpdatePassword"
import UpdatePassword from "../pages/UpdatePassword"
import AllUsers from "../pages/AllUsers"
import RejectedCandidates from "../pages/RejectedCandidates"

const AppRoute = () =>{
  return(
<Routes>
  <Route path="/" element={<LoginPage/>}/>
  <Route path="/add-candidate" element={<AddCandidate/>}></Route>
  <Route path="/all-candidate" element={<AllCandidate/>}></Route>
  <Route path="/create-user" element={<CreateUser/>}></Route>
  <Route path="/reset-password" element={<ResetPassword/>}></Route>
  <Route path="/update-password" element={<UpdatePassword/>}></Route>
  <Route path="/all-users" element={<AllUsers/>}></Route>
  <Route path="/rejected-candidates" element= {<RejectedCandidates/>}></Route>
</Routes>
  )
}

export default AppRoute