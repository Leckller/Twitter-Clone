import { useState } from "react"
import { Popup } from ".."
import { postAction } from "../../Redux/Slices";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import PostFetch from "../../services/PostFetch";
import { Post } from "../../types/posts.types";


function Tweet({ setPopup }: { setPopup: (p: boolean) => void }) {
  const [textArea, setTextArea] = useState('');
  const dispatch = useAppDispatch();
  const { token: { token }, user } = useAppSelector(state => state);
  const request = new PostFetch(token);

  return (
    <Popup>
      <div className="w-full p-5 flex flex-row justify-between text-center">
        <button className="font-medium text-2xl" onClick={() => setPopup(false)}>
          x
        </button>
        <button
          onClick={() => {
            request.createPost(textArea).then((resp: Post) => dispatch(postAction.setGlobal([{
              ...resp, postUser: { customName: user.customName, picture: user.picture, tagName: user.tagName }
            }])));
            setPopup(false);
          }}
          className="border-2 rounded-md border-black w-20">
          Postar
        </button>
      </div>

      <div className="h-full flex flex-col gap-2 items-end w-full p-5">
        <textarea className="resize-none w-full h-full" onChange={({ target: { value } }) => setTextArea(value)} value={textArea} />
      </div>
    </Popup>
  )
}

export default Tweet
