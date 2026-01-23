import { Routes, Route} from "react-router-dom"
import AddCandidate from "../pages/AddCandidate"
import AllCandidate from "../pages/AllCandidate"
import  LoginPage  from "../pages/Login"
const AppRoute = () =>{
  return(
<Routes>
  <Route path="/" element={<LoginPage/>}/>
  <Route path="/add-candidate" element={<AddCandidate/>}></Route>
  <Route path="/all-candidate" element={<AllCandidate/>}></Route>
</Routes>
  )
}

export default AppRoute