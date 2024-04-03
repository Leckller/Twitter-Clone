import { useState } from "react"
import { Cadastro, Login } from "../components";

function Checkin() {
  const [login, setLogin] = useState(false);
  const [cadastro, setCadastro] = useState(false);

  return (
    <main className={`
      flex flex-col h-screen relative
      ${(login || cadastro) ? "bg-neutral-500" : ""} md:text-2xl sm:text-2xl
      justify-center items-center
    `}>
      <div className={`
      h-[100%] md:w-[50%] flex flex-col
      gap-10 p-10 pt-20 text-2xl ${(login || cadastro) ? "bg-neutral-500" : ""}
      `}>

        <h1 className="text-6xl font-bold">O que tá rolando?</h1>

        <div className="h-[80%] flex flex-col gap-16 justify-center">

          <div className="flex flex-col gap-3">
            <h2 className="text-3xl">Não possui uma conta?</h2>
            <button
              className="bg-sky-500 text-white p-3 rounded-3xl w-[60%]"
              onClick={() => setCadastro(prev => !prev)}>
              Criar conta
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-3xl">Já tem uma conta?</h2>
            <button
              className="border border-gray-400 text-sky-500 p-3 rounded-3xl w-[60%]"
              onClick={() => setLogin(prev => !prev)}>
              Entrar
            </button>
          </div>

        </div>

      </div>
      {login && <Login setPopup={setLogin} />}
      {Cadastro && <Cadastro setPopup={setLogin} />}
    </main>
  )
}

export default Checkin
