import routes from "routes.json" assert { type: "json" };

function getIndex(main_route: string, sub_route: string) {
  let index = 0;
  for (const route of routes) {
    if (!sub_route && "/" + main_route === route.link) {
      return index;
    }

    index++;

    if (!route.sub_files) continue;

    for (const sub of route.sub_files) {
      if ("/" + main_route + "/" + sub_route === sub.link) {
        return index;
      }
      index++;
    }
  }

  return -1;
}

function getRoute(index: number): [string, string] | null {
  if (index < 0) {
    return null;
  }

  let i = 0;
  for (const route of routes) {
    if (i === index) {
      return [route.name, route.link];
    }

    i++;

    if (!route.sub_files) continue;

    for (const sub of route.sub_files) {
      if (i === index) {
        return [sub.name, sub.link];
      }
      i++;
    }
  }

  return null;
}

export function Footer(props: { route: string }) {
  const route = props.route.split("/").slice(1);
  const cur_index = getIndex(route[0], route[1]);

  const previous: [string, string] | null = getRoute(cur_index - 1);
  const next: [string, string] | null = getRoute(cur_index + 1);

  return (
    <div
      class={`mt-4 grid gap-4 ${
        previous && next ? "grid-rows-2 md:grid-cols-2 md:grid-rows-1" : ""
      }`}
    >
      {previous && (
        <a
          href={"/docs" + previous[1]}
          class="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 rounded flex flex-col"
        >
          <span class="text-sm text-gray-500 dark:text-gray-400">
            ← Previous
          </span>
          {previous[0]}
        </a>
      )}
      {next && (
        <a
          href={"/docs" + next[1]}
          class="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 rounded flex flex-col items-end"
        >
          <span class="text-sm text-gray-500 dark:text-gray-400">Next →</span>
          {next[0]}
        </a>
      )}
    </div>
  );
}
