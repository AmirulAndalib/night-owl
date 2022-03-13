/** @jsx h */

import { NotFound } from "./components/not_found.tsx";
import { PageBackground } from "./components/page_background.tsx";
import { AppConfig, Script } from "./lib/config.ts";
import { SourceFile } from "./lib/source_file.ts";
import { mainStyles, styles } from "./lib/styles.ts";
import { Header } from "./components/header.tsx";
import { Component, Fragment, h, Helmet, render, tw } from "./deps.ts";
import { MarkdownPage } from "./pages/markdown_page.tsx";
import { VersionWarning } from "./components/version_warning.tsx";

interface AppOptions {
  url: string;
  config: AppConfig;
  scripts: Record<string, Script>;
}

export class App extends Component<AppOptions> {
  #file?: SourceFile;
  #isBranch = false;

  constructor(props: AppOptions) {
    super(props);

    const url = new URL(this.props.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    const files = this.props.config.sourceFiles.filter((file) =>
      file.route === pathname
    );

    this.#file = files.find((file) => !file.isDirectory) ?? files[0];

    if (!this.#file && pathname === "/") {
      this.#file = this.props.config.sourceFiles.find((file) =>
        !file.isDirectory
      );
    }

    if (
      this.#file && this.#file.rev &&
      this.#file.versions?.branches.includes(this.#file.rev)
    ) {
      this.#isBranch = true;
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          {Object.entries(this.props.scripts)
            .filter(([route, script]) => script.contentType === "text/css")
            .map(([route]) => (
              <link rel="stylesheet" type="text/css" href={route} />
            ))}

          {Object.entries(this.props.scripts)
            .filter(([route, script]) =>
              script.contentType === "application/javascript"
            )
            .map(([route]) => (
              <script type="application/javascript" src={route} defere />
            ))}
        </Helmet>

        <div class={tw`${mainStyles} mb-7 ${styles.font.primary}`}>
          <PageBackground>
            {render(this.props.config.background ?? null)}
          </PageBackground>

          {/* header */}
          <div class={tw`sticky top-0 z-10`}>
            <Header config={this.props.config} file={this.#file} />
            {this.#isBranch
              ? <VersionWarning config={this.props.config} file={this.#file} />
              : null}
          </div>

          {/* content */}
          <div class={tw`max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative`}>
            {this.#renderPage()}
          </div>
        </div>

        <Helmet footer>
          <script type="application/javascript">
            {`
              main();
  
              function main() {
                if (isDarkModeEnabled()) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              }
  
              function isDarkModeEnabled() {
                return localStorage.theme === "dark" || (
                  !localStorage.theme &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                );
              }
            `}
          </script>
        </Helmet>
      </Fragment>
    );
  }

  #renderPage() {
    // Render page not found.
    if (!this.#file) {
      return this.props.config.notFound
        ? this.props.config.notFound({ url: this.props.url })
        : <NotFound url={this.props.url} />;
    }

    // Render custom page component.
    if (this.#file.component) {
      return this.#file.component;
    }

    // Render markdown page.
    return (
      <MarkdownPage
        file={this.#file}
        config={this.props.config}
        isBranch={this.#isBranch}
      />
    );
  }
}
