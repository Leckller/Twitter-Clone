import { ReactNode } from "react"

function PopupFom({ children }: { children: ReactNode }) {
  return (
    <div className="
    absolute h-[100%] w-[100%] flex flex-col bg-white 
    sm:h-[70%] sm:w-[60%] md:h-[70%] md:w-[40%]
    items-center md:rounded-md sm:rounded-md
    ">
      {children}
    </div>
  )
}

export default PopupFom
