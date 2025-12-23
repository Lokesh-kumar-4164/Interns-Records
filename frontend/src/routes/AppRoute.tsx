import { Routes, Route} from "react-router-dom"
import AddCandidate from "../pages/AddCandidate"
import AllCandidate from "../pages/AllCandidate"
const AppRoute = () =>{
  return(
<Routes>
  <Route path="/" element={<AddCandidate/>}></Route>
  <Route path="/all-candidate" element={<AllCandidate/>}></Route>
</Routes>
  )
}

export default AppRoute