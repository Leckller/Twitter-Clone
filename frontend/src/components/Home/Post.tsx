
import { Link } from "react-router-dom";
import { Post as PostType, PostUser } from "../../types/posts.types";

const iconDefault = 'https://img.icons8.com/pastel-glyph/64/gender-neutral-user.png'

function Post({ data, user: { postUser } }: { data: PostType, user: PostUser }) {
  return (
    <article
      className="flex flex-row border-b border-gray-700
       max-h-[350px] pr-3 pl-3 pb-3 pt-2 text-white gap-2
    ">
      <Link to={`/user/${data.userId}`}>
        <img
          className="w-[40px], h-[40px] rounded-full border border-black"
          src={postUser.picture.length < 10 ? iconDefault : postUser.picture} alt="Profile"
        />
      </Link>

      <div className="flex flex-col">
        <div className="flex flex-row gap-3 -translate-y-2 items-center">
          <h2 className="text-lg font-bold">{postUser.customName}</h2>
          <h3 className="text-xs">@{postUser.tagName}</h3>
        </div>
        <p className="max-h-[400px] break-all">
          {data.content}
        </p>
      </div>

    </article >
  )
}

export default Post
