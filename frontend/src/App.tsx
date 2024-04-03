import { Route, Routes } from "react-router-dom"
import { Checkin } from "./routes"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Checkin />} />
    </Routes>
  )
}

export default App
