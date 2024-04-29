import { useParams } from "react-router-dom"
import PostFetch from "../services/PostFetch";
import { useAppSelector } from "../hooks/ReduxHooks";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { UserPosts } from "../types/posts.types";
import Post from "../components/Home/Post";
const iconDefault = 'https://img.icons8.com/pastel-glyph/64/gender-neutral-user.png'

function User() {
  const { userId } = useParams();
  const { token: { token } } = useAppSelector(state => state);
  const request = new PostFetch(token);
  const { user } = useAppSelector(state => state);
  const [profile, setProfile] = useState<UserPosts>({ picture: iconDefault, userPost: [{}] } as UserPosts);

  useEffect(() => {
    request.getProfile(Number(userId)).then(resp => setProfile(resp));
  }, [])

  if (!token) return <NotFound />;

  return (
    <div className="bg-gray-900 h-screen overflow-hidden">
      <header className="border-b border-gray-700 max-h-[250px]">
        <div className="w-full h-[100px] bg-gradient-to-r from-blue-800 to-gray-900"></div>{/* <img src="" alt="banner" /> */}

        <div className="p-2 text-white border-t-2 border-black">

          <div className="flex flex-row justify-between">
            <img src={profile.picture.length < 10 ? iconDefault : profile.picture} alt="icon"
              className="w-[60px], h-[60px] rounded-full border-2 border-black -translate-y-10 bg-gradient-to-b from-blue-800 to-gray-900"
            />
            {user.tagName === profile.tagName && <button className="h-8 pl-2 pr-2 text-sm text-center rounded-2xl border border-white">Editar Perfil</button>}
          </div>

          <section className="-translate-y-10 pl-3">
            <h2 className="text-2xl">{profile.customName}</h2>
            <h3 className="text-gray-400">@{profile.tagName}</h3>

            <p>{profile.description}</p>

            <div className="flex flex-row gap-5">
              <h4>0 Seguidores</h4>
              <h4>0 Seguindo</h4>
            </div>
          </section>
        </div>
      </header>

      <main>
        {profile.userPost.length > 0 && profile.userPost.map(post => (
          <Post data={post} user={{ postUser: { customName: profile.customName, picture: profile.picture, tagName: profile.tagName } }} />
        ))}
      </main>

    </div>
  )
}

export default User;
