import Search from "islands/Search.tsx";
import routes from "routes.json" assert { type: "json" };

interface SidebarProps {
  route: string;
}

export function Sidebar(props: SidebarProps) {
  return (
    <div class="flex flex-col gap-4">
      <Search />
      <div class="flex flex-col gap-2">
        {routes.map((route, i) => (
          <>
            <a
              href={"/docs" + route.link}
              class={`hover:text-gray-400 dark:hover:text-white ${
                props.route === route.link ? "font-semibold" : ""
              }`}
            >
              {i + 1}. {route.name}
            </a>
            {route.sub_files && (
              route.sub_files.map((subroute, sub_i) => (
                <a
                  href={"/docs" + subroute.link}
                  class={`pl-4 hover:text-gray-400 dark:hover:text-white ${
                    props.route === subroute.link ? "font-semibold" : ""
                  }`}
                >
                  {i + 1}.{sub_i + 1}. {subroute.name}
                </a>
              ))
            )}
          </>
        ))}
      </div>
    </div>
  );
}
