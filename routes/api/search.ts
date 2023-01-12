import { Handlers } from "$fresh/server.ts";
import { Result } from "islands/Search.tsx";
import routes from "routes.json" assert { type: "json" };

async function handleRoute(
  query: string,
  route: { name: string; link: string },
) {
  if (route.name.toLowerCase().includes(query)) {
    return [{
      title: route.name,
      link: "/docs" + route.link,
    }];
  } else {
    const text = await Deno.readTextFile(
      "./docs" + route.link + ".md",
    );
    const snippetIndex = text.toLowerCase().indexOf(query);

    if (snippetIndex !== -1) {
      return [{
        title: route.name,
        snippet: text.slice(snippetIndex - 15, snippetIndex + 15),
        link: "/docs" + route.link,
      }];
    }
  }

  return [];
}

export const handler: Handlers = {
  async POST(req) {
    const request = await req.json();
    const query: string = request.query.toLowerCase();
    let results: Result[] = [];

    for (const route of routes) {
      results = [...results, ...await handleRoute(query, route)];

      if (!route.sub_files) continue;

      for (const subroute of route.sub_files) {
        results = [...results, ...await handleRoute(query, subroute)];
      }
    }

    results.sort((a, b) => {
      if (a.snippet && b.snippet) return 0;
      if (!a.snippet && !b.snippet) return 0;
      if (a.snippet && !b.snippet) return 1;
      if (!a.snippet && b.snippet) return -1;

      return 0;
    });

    return new Response(JSON.stringify(results));
  },
};
