import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "gfm";
import { resolve } from "std/path/mod.ts";
import { Header } from "components/Header.tsx";
import Search from "islands/Search.tsx";

interface DocumentationProps {
  body: string;
  route: string;
}

const routes = [
  {
    name: "Introduction",
    link: "/introduction",
  },
  {
    name: "Getting started",
    link: "/getting-started",
    sub_files: [
      {
        name: "Creating a database",
        link: "/getting-started/create-database",
      },
      {
        name: "Tables",
        link: "/getting-started/tables",
      },
    ],
  },
];

export const handler: Handlers<DocumentationProps> = {
  async GET(_, ctx) {
    let body = "";

    try {
      body = await Deno.readTextFile(
        resolve("docs", ctx.params.route) + ".md",
      );
    } catch {
      ctx.renderNotFound();
    }

    return ctx.render({
      body,
      route: "/" + ctx.params.route,
    });
  },
};

export default function Documentation(props: PageProps<DocumentationProps>) {
  return (
    <>
      <Head>
        <title>CookieDB Documentation</title>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <div class="flex flex-col p-4 w-screen min-h-screen text-black dark:text-[rgb(201,209,217)] bg-white dark:bg-[rgb(13,17,23)]">
        <Header />
        <div class="flex justify-center h-full">
          <div class="flex gap-8 max-w-screen-lg w-full overflow-hidden">
            <div class="border-r pr-8 flex flex-col gap-4 dark:border-[rgb(33,38,45)]">
              <Search />
              <div class="flex flex-col gap-2">
                {routes.map((route, i) => (
                  <>
                    <a
                      href={"/docs" + route.link}
                      class={`hover:text-gray-400 dark:hover:text-white ${
                        props.data.route === route.link ? "font-semibold" : ""
                      }`}
                    >
                      {i + 1}. {route.name}
                    </a>
                    {route.sub_files && (
                      route.sub_files.map((subroute, sub_i) => (
                        <a
                          href={"/docs" + subroute.link}
                          class={`pl-4 hover:text-gray-400 dark:hover:text-white ${
                            props.data.route === subroute.link
                              ? "font-semibold"
                              : ""
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
            <div
              data-color-mode="auto"
              data-light-theme="light"
              data-dark-theme="dark"
              class="markdown-body"
              dangerouslySetInnerHTML={{ __html: render(props.data.body) }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
