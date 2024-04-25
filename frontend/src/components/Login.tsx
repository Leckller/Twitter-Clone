import { Popup } from "."
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import UserFetch from "../services/UserFetch";
import { userAction, tokenAction } from "../Redux/Slices";
import { UserFields, UserResponse } from "../types/users.types";
import { useNavigate } from "react-router-dom";

const fieldsForm: UserFields[] = ['email', 'password'];

function Login({ setPopup }: { setPopup: (p: boolean) => void }) {
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

      <div className="flex flex-col w-[80%] gap-5 md:text-2xl">
        <h1 className="text-left text-3xl font-medium">É bom ver você de volta!</h1>
        {fieldsForm.map(field => (
          <label key={field}>
            <h2 className="uppercase text-xl font-bold ">{field}</h2>
            <input
              onChange={({ target: { value } }) => dispatch(userAction.setUserByField({ field, value }))}
              className="border border-gray-400 w-full rounded-md p-3"
              placeholder={field}
              type={field === 'password' ? 'password' : 'text'}
              name="field"
              value={user[field]}
            />
          </label>
        ))}

        <button
          onClick={() => {
            request.loginUser(user.email, user.password).then((resp: UserResponse) => {
              dispatch(userAction.setUser(resp.user));
              dispatch(tokenAction.setToken(resp.token));
              navigate('/home');
            });
          }}
          className="bg-black text-white p-3 rounded-md">
          Logar
        </button>
      </div>
    </Popup>
  )
}

export default Login
