import { Liveblocks } from "@liveblocks/node";

export const SECRET_API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

export const liveblocks = new Liveblocks({ secret: SECRET_API_KEY as string });

if (typeof window !== "undefined") {
  console.log();
  console.error(
    "DANGER: You're using data from /liveblocks.server.config.ts on the client"
  );
  console.error("This may expose your secret key(s)");
  console.log();
}

if (!SECRET_API_KEY) {
  throw new Error(`You must add your Liveblocks secret key to .env.local to use the starter kit

Example .env.local file:
LIVEBLOCKS_SECRET_KEY=sk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

You can find your secret keys on https://liveblocks.io/dashboard/apikeys
Follow the full starter kit guide on https://liveblocks.io/docs/guides/nextjs-starter-kit

`);
}
