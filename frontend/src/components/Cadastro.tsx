import { Popup } from "."
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import { UserFields, UserResponse } from "../types/users.types"
import { tokenAction, userAction } from "../Redux/Slices";
import UserFetch from "../services/UserFetch";
import { useNavigate } from "react-router-dom";

const fieldsForm: UserFields[] = ['customName', 'description', 'email', 'password', 'picture', 'tagName'];

function Cadastro({ setPopup }: { setPopup: (p: boolean) => void }) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state);
  const request = new UserFetch();
  const navigate = useNavigate();

  return (
    <Popup>
      <div className="w-full p-5 text-2xl">
        <button className="font-medium" onClick={() => setPopup(false)}>
          x
        </button>
      </div>

      <div className="flex flex-col w-[80%] gap-5 md:text-2xl overflow-y-auto p-2 pb-10">
        <h1 className="text-left text-3xl font-medium">Criar sua conta</h1>
        {fieldsForm.map(field => (
          <label key={field}>
            <h2 className="uppercase text-xl font-bold ">{field}</h2>
            <input
              onChange={({ target: { value } }) => dispatch(userAction.setUserByField({ field, value }))}
              className="border border-gray-400 w-full rounded-md p-3"
              placeholder={field}
              type="text"
              name="field"
            />
          </label>
        ))}

        <button
          onClick={() => {
            request.createUser(user).then((resp: UserResponse) => {
              dispatch(userAction.setUser(resp.user));
              dispatch(tokenAction.setToken(resp.token));
              navigate('/home')
            });
          }}
          className="bg-black text-white p-3 rounded-md">
          Logar
        </button>
      </div>
    </Popup>
  )
}

export default Cadastro
