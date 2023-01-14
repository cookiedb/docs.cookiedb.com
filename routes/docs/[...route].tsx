import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { resolve } from "std/path/mod.ts";
import { Header } from "components/Header.tsx";
import { Sidebar } from "components/Sidebar.tsx";
import { languages } from "islands/Language.tsx";
import { getCookies } from "std/http/cookie.ts";

// GFM stuff
import { CSS, render } from "gfm";
import "https://esm.sh/prismjs@1.29.0/components/prism-json?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-bash?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-typescript?no-check";

interface DocumentationProps {
  body: string;
  route: string;
  language: keyof typeof languages;
}

export const handler: Handlers<DocumentationProps> = {
  async GET(req, ctx) {
    let body = "";

    const language = getCookies(
      req.headers,
    )["language"] as keyof typeof languages;
    const keep = language ?? "bash";

    try {
      body = await Deno.readTextFile(
        resolve("docs", ctx.params.route) + ".md",
      );
    } catch {
      ctx.renderNotFound();
    }

    for (const language of Object.keys(languages)) {
      if (language === keep) continue;
      body = body.replace(new RegExp(`\`\`\`${language}.*?\`\`\``, "gis"), "");
    }

    return ctx.render({
      body,
      route: "/" + ctx.params.route,
      language,
    });
  },
};

export default function Documentation(props: PageProps<DocumentationProps>) {
  return (
    <>
      <Head>
        <title>
          {props.data.body.split("\n\n")[0].slice(1)} | CookieDB Docs
        </title>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <meta name="description" content={props.data.body.split("\n\n")[1]} />
      </Head>
      <div class="flex flex-col p-4 w-screen min-h-screen text-black dark:text-[rgb(201,209,217)] bg-white dark:bg-[rgb(13,17,23)]">
        <Header language={props.data.language} />
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
