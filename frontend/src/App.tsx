import Navbar from "./components/Navbar"
import AppRoute from "./routes/AppRoute"

Navbar
function App() {
  return (
    <>
     <Navbar></Navbar>
     <div className="flex items-center justify-center">
     <AppRoute></AppRoute>
     </div>
    </>
  )
}

export default App
