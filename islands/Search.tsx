import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { debounce } from "std/async/debounce.ts";

export interface Result {
  title: string;
  link: string;
  snippet?: string;
}

export default function Search() {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [selected, setSelected] = useState(0);

  const searchBox = useRef<HTMLInputElement>(null);

  const debouncedQuery = useCallback(
    debounce(async (query: string) => {
      const req = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      setResults(await req.json());
    }, 150),
    [],
  );

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (show) {
        if (e.key === "Escape" || e.key === "Enter") {
          setShow(false);
          setQuery("");
          setResults([]);

          console.log(e.key, results.length);

          if (e.key === "Enter" && results.length > selected) {
            window.location.href = results[selected].link;
          }

          e.preventDefault();
        }

        if (e.key === "ArrowUp") {
          setSelected(selected - 1 < 0 ? results.length - 1 : selected - 1);

          e.preventDefault();
        }

        if (e.key === "ArrowDown" || e.key === "Tab") {
          setSelected((selected + 1) % results.length);

          e.preventDefault();
        }
      } else {
        if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
          setShow(true);
          searchBox.current?.select();
        }
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [show, results, selected]);

  useEffect(
    () => {
      if (query.length > 2) {
        debouncedQuery(query);
      } else {
        setResults([]);
      }
    },
    [query],
  );

  return (
    <>
      <button
        onClick={() => {
          searchBox.current?.select();
          setShow(true);
        }}
        class="bg-gray-200 dark:bg-gray-800 px-4 py-1 w-56 no-break whitespace-nowrap rounded-full text-left border-2 border-transparent hover:border-blue-500"
      >
        🔍 Search
      </button>
      <div
        onClick={() => {
          setShow(false);
          setQuery("");
          setResults([]);
        }}
        class={`${
          show ? "" : "hidden"
        } absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-20 flex justify-center items-center`}
      >
        <div
          class="p-2 rounded bg-white max-w-lg w-full flex flex-col gap-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            class="bg-gray-200 dark:bg-gray-800 px-4 py-2 w-full rounded border-2 border-blue-500"
            placeholder="🔍 Search"
            value={query}
            ref={searchBox}
            onInput={(e) => {
              if (!e.target) return;
              setQuery((e.target as HTMLInputElement).value);
              setSelected(0);
            }}
          />
          {results.length === 0 && (
            <p class="p-4 border-2 rounded">No results to display</p>
          )}
          {results.map((result, i) => (
            <a
              href={result.link}
              class={`p-4 border-2 hover:border-blue-500 rounded ${
                i === selected ? "border-blue-500" : ""
              }`}
            >
              {result.snippet
                ? (
                  <>
                    <p>...{result.snippet}...</p>
                    <p class="text-sm">{result.title}</p>
                  </>
                )
                : <p>{result.title}</p>}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
