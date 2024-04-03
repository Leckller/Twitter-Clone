function Login({ setPopup }: { setPopup: (p: boolean) => void }) {
  return (
    <div className="
      absolute h-[100%] w-[100%] flex flex-col bg-white 
      sm:h-[70%] sm:w-[60%] md:h-[70%] md:w-[30%]  gap-10
      items-center md:rounded-md sm:rounded-md
      ">
      <div className="w-full p-5 text-2xl">
        <button className="font-medium" onClick={() => setPopup(false)}>
          x
        </button>
      </div>

      <div className="flex flex-col w-[80%] gap-5 md:text-2xl">
        <h1 className="text-left text-3xl font-medium">Criar sua conta</h1>
        <label>
          <input
            className="border border-gray-400 w-full rounded-md p-3"
            placeholder="Email"
            type="email"
          />
        </label>
        <label>
          <input
            className="border border-gray-400 w-full rounded-md p-3"
            placeholder="Password"
            type="password"
          />
        </label>

        <button
          className="bg-black text-white p-3 rounded-md">
          Logar
        </button>
      </div>
    </div>
  )
}

export default Login
