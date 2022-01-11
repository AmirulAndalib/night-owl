import { apply, css, theme } from "../deps.ts";

const transformMain = apply`transform-colors duration-500 ease-out`;
export const transformGpu = apply`${transformMain} transform-gpu`;

export const bgMain = apply`bg-gray(50 dark:800)`;
export const textMain = apply`antialiased text-gray(700 dark:200)`;

const globalStyles = css({
  ":global": {
    "html": apply`min-h-full flex`,
    "body": apply`${textMain} ${bgMain} flex-1 w-full`,
  },
});

const headlines = css({
  "h1, h2, h3": css(apply`flex relative font-bold sm:truncate`, {
    "&:hover": {
      ".anchor-link": {
        "&::before": {
          visibility: "visible",
        },
      },
    },
  }),
  "h1": apply`text-2xl leading-7 sm:text-3xl mb-5 mr-8 -left-8`,
  "h2": apply`text-xl leading-6 sm:text-2xl mb-4 mt-10 mr-7 -left-7`,
  "h3": apply`text-lg leading-5 sm:text-xl mb-3 mt-10 mr-6 -left-6`,
  ".anchor": apply`block relative -top-28 invisible`,
  "h1 .anchor-link::before": apply`text-xl sm:text-2xl`,
  "h2 .anchor-link::before": apply`text-lg sm:text-xl`,
  "h3 .anchor-link::before": apply`text-sm sm:text-lg`,
  ".anchor-link": {
    "&::before": {
      fontFamily: theme("fontFamily.awesome"),
      content: '"\\f0c1"',
      fontWeight: 900,
      marginRight: ".5rem",
      visibility: "hidden",
    },
  },
});

const links = css({
  "a:not(nav a,header a)": apply
    `text-blue(500 dark:400) hover:text-blue(600 dark:500)`,
  "nav a": apply`hover:text(gray-500 dark:white)`,
  'a[href*="//"]': {
    "&::after": {
      fontFamily: theme("fontFamily.awesome"),
      color: theme("colors.blue.500"),
      fontSize: "0.7rem",
      content: '"\\f35d"',
      fontWeight: 900,
      position: "relative",
      marginLeft: "0.4rem",
      top: "-2px",
    },
  },
});

const images = css({
  "p img": apply`mt-5 mb-5`,
});

export const mainStyles = css(
  globalStyles,
  headlines,
  links,
  images,
);

export const syntaxHighlighting = css({
  ".language-console": apply`text-blue(500 dark:400)`,
  ".language-console .bash": textMain,
  ".code-comment": apply`text-gray(500 dark:400)`,
  ".code-function": apply`text-green(700 dark:300)`,
  ".code-literal": apply`text-cyan(600 dark:400) font-bold`,
  ".code-keyword": apply`text-purple(700 dark:400) font-italic`,
  ".code-operator": apply`text-purple(700 dark:400)`,
  ".code-variable.code-language": apply`text-purple(700 dark:400)`,
  ".code-number": apply`text-indigo(600 dark:400)`,
  ".code-doctag": apply`text-indigo(600 dark:400)`,
  ".code-regexp": apply`text-red(700 dark:300)`,
  ".code-meta, .code-string": apply`text-yellow(500 dark:200)`,
  ".code-meta": apply`font-bold`,
  ".code-type": apply`text-cyan(600 dark:400) font-italic`,
  ".code-built_in": apply`text-cyan(600 dark:400) font-italic`,
});
