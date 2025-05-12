import { liveblocks } from "@/liveblocks.server.config";
import { AVATAR_COLORS } from "@/utils/constants";

export async function POST(req: Request) {
  const res = await req.json();

  const user = {
    id: "1",
    info: {
      name: res.name,
      avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${
        res.name
      }&scale=80&backgroundColor=0a5b83&backgroundRotation[]&shapeColor=${shapeColor()}`,
    },
  };

  const session = liveblocks.prepareSession(user.id, { userInfo: user.info });
  session.allow(res.room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}

function shapeColor() {
  const randomIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
  return AVATAR_COLORS[randomIndex];
}
