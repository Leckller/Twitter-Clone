import { useEffect, useState } from "react"
import PostFetch from "../services/PostFetch"
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import Header from "../components/Home/Header";
import Post from "../components/Home/Post";
import { postAction } from '../Redux/Slices/index';
import Tweet from "../components/Home/Tweet";
import NotFound from "./NotFound";

function Home() {
  const [popup, setPopup] = useState(false)
  const { token: { token }, posts } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const request = new PostFetch(token);

  useEffect(() => {
    request.globalPosts().then(resp => {
      dispatch(postAction.setGlobal(resp));
    });
  }, []);

  if (!token) return <NotFound />;

  return (
    <div className="bg-gray-900 h-screen overflow-hidden">
      {popup && <Tweet setPopup={setPopup} />}
      <Header />
      <main className="h-full w-full overflow-y-auto">
        {posts.global.length > 0 && posts.global.map((post) => (
          <Post data={post} user={post} key={post.id} />
        ))}
      </main>
      {!popup && (
        <button
          onClick={() => setPopup(true)}
          className="fixed w-12 h-12 rounded-full bg-white bottom-5 right-5">
          X
        </button>
      )}
    </div>
  )
}

export default Home
