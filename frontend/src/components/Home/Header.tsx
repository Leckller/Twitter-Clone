import { useAppSelector } from "../../hooks/ReduxHooks";

const iconDefault = 'https://img.icons8.com/pastel-glyph/64/gender-neutral-user.png'

function Header() {
  const { user } = useAppSelector(state => state);

  return (
    <header className="flex flex-row items-center pr-2 pl-2 flex-nowrap h-[50px] border-b border-gray-700">
      <img
        className="w-[40px], h-[40px] rounded-full border border-black"
        src={user.picture.length < 10 ? iconDefault : user.picture} alt="Profile"
      />
    </header>
  )
}

export default Header
