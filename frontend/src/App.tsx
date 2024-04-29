import { Route, Routes } from "react-router-dom"
import { Checkin, Home, User, NotFound } from "./routes"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Checkin />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/user/:userId" element={<User />} />
    </Routes>
  )
}

export default App
