import { Route, Routes } from "react-router-dom"
import { Checkin } from "./routes"
import Home from "./routes/Home"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Checkin />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
