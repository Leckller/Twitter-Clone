import { useState } from "react"
import { Login } from "../components";

function Checkin() {
  const [popup, setPopup] = useState(false);

  return (
    <main className={`
      flex flex-col justify-center items-center h-screen relative
      ${popup ? "bg-neutral-500" : ""} md:text-2xl sm:text-2xl
    `}>
      <h1>Whats Popping?</h1>

      <div>
        <h2>Não possui uma conta?</h2>

        <button onClick={() => setPopup(prev => !prev)}>
          Criar conta
        </button>
      </div>

      {popup && <Login setPopup={setPopup} />}
    </main>
  )
}

export default Checkin
