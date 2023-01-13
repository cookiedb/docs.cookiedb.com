import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "gfm";
import { resolve } from "std/path/mod.ts";
import { Header } from "components/Header.tsx";
import { Sidebar } from "components/Sidebar.tsx";

interface DocumentationProps {
  body: string;
  route: string;
}

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
        <meta name="description" content={props.data.body.split("\n\n")[1]} />
      </Head>
      <div class="flex flex-col p-4 w-screen min-h-screen text-black dark:text-[rgb(201,209,217)] bg-white dark:bg-[rgb(13,17,23)]">
        <Header />
        <div class="flex justify-center h-full">
          <div class="flex gap-8 max-w-screen-lg w-full overflow-hidden">
            <div class="border-r dark:border-[rgb(33,38,45)] pr-8 hidden md:block">
              <Sidebar route={props.data.route} />
            </div>
            <section
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
