import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    return new Response("", {
      headers: {
        location: "/docs/introduction",
      },
      status: 307,
    });
  },
};
