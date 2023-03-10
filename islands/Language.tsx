import { useEffect, useState } from "preact/hooks";

export const languages = {
  typescript: "Typescript",
  bash: "Curl",
};

interface LanguageProps {
  language: keyof typeof languages;
}

export default function Language(props: LanguageProps) {
  const [language, setLanguage] = useState<keyof typeof languages>(
    props.language,
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    const e = () => {
      if (show) {
        setShow(false);
      }
    };

    document.body.addEventListener("click", e);

    return () => {
      document.body.removeEventListener("click", e);
    };
  }, [show]);

  return (
    <div class="w-52">
      <button
        class={`w-full text-left flex justify-between ${
          show ? "rounded-t" : "rounded"
        } bg-gray-200 dark:bg-gray-800 px-4 py-2 transition-all cursor-pointer hover:text-gray-400`}
        onClick={() => {
          setShow(!show);
        }}
      >
        {languages[language]}
        <span
          class={`text-gray-900 transition-all duration-300 ${
            show ? "rotate-180" : "rotate-0"
          }`}
        >
          ↓
        </span>
      </button>
      {show && (
        <div class="absolute w-52">
          {(Object.entries(languages) as {
            [K in keyof typeof languages]: [K, typeof languages[K]];
          }[keyof typeof languages][]).map(([raw, name], i) => (
            language === raw ? null : (
              <button
                onClick={() => {
                  setShow(!show);
                  setLanguage(raw);
                  document.cookie = `language=${raw}; path=/; max-age=31536000`;
                  location.reload();
                }}
                class={`${
                  i === Object.keys(languages).length - 1 ? "rounded-b" : ""
                } text-left w-full bg-gray-200 dark:bg-gray-800 border-t-2 border-gray-300 px-4 py-2 cursor-pointer transition-all hover:text-gray-400`}
              >
                {name}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}
