/** @jsx h */

import { Component, Fragment, h, Helmet, render, tw } from "../deps.ts";
import { styles } from "../lib/styles.ts";

export interface SelectionOption {
  value: string;
  name: string;
}

export interface SelectionOptions {
  options: Array<string | SelectionOption>;
  selected?: string;
  class?: string;
  onchange?: string;
}

export class Selection extends Component<SelectionOptions> {
  #id = Math.round(Math.random() * 100) + Date.now();

  render2() {
    return (
      <Fragment>
        <div
          class={`${this.props.class} ${tw`mb-7 relative inline-block w-full`}`}
        >
          <select
            onchange={this.props.onchange}
            class={tw`w-full h-10 pl-3 pr-6
              bg-gray-100 dark:bg-gray-700
              border-1 border-gray-200 dark:border-gray-600 rounded-xl
              appearance-none
              ${styles.transform.primary}`}
          >
            {this.props.options
              .map((value) =>
                typeof value === "string" ? { value, name: value } : value
              )
              .map(({ value, name }) =>
                render(
                  this.props.selected === value
                    ? <option value={value} selected>{name}</option>
                    : <option value={value}>{name}</option>,
                )
              )}
          </select>
          <div
            class={tw
              `absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none`}
          >
            <svg class={tw`w-4 h-4 fill-current`} viewBox="0 0 20 20">
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <script>
            {`
            document.addEventListener("click", (event) => {
              var button = document.getElementById("dropdown-button-${this.#id}");
              var dropdown = document.getElementById("dropdown-${this.#id}");
              if (
                event.target === button || button.contains(event.target) ||
                event.target === dropdown || dropdown.contains(event.target)
              ) {
                return;
              }

              var element = document.getElementById("dropdown-${this.#id}");
              if (element && !element.classList.contains("hidden")) {
                element.classList.add("hidden");
              }
            });

            function toggleDropwdown${this.#id}() {
              var button = document.getElementById("dropdown-button-${this.#id}");
              var dropdown = document.getElementById("dropdown-${this.#id}");
              if (dropdown) {
                if (dropdown.classList.contains("hidden")) {
                  dropdown.classList.remove("hidden");
                  button.blur();
                } else {
                  dropdown.classList.add("hidden");
                }
              }
            }
          `}
          </script>
        </Helmet>
        <div
          class={`${this.props.class} ${tw`mb-7 relative inline-block w-full`}`}
        >
          <div>
            <button
              type="button"
              class={tw`inline-flex w-full
                rounded-xl border border-gray(200 dark:700) shadow-sm
                px-5 py-2
                ${styles.transform.primary}
                ${styles.bg.secondary} hover:bg(gray-50 dark:gray-700)
                text-left text-sm font-bold font-primary ${styles.text.primary}
                focus:(outline-none ring(2 blue(200 dark:500) offset(2 gray(100 dark:600))))`}
              id={`dropdown-button-${this.#id}`}
              aria-expanded="true"
              aria-haspopup="true"
              onclick={`toggleDropwdown${this.#id}()`}
            >
              {this.props.selected ?? "Select version"}
              <svg
                class={tw`-mr-1 ml-2 h-5 w-5 absolute right-5`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            class={tw`hidden
              z-20 origin-top-right absolute right-0
              py-3 mt-3 w-full rounded-xl shadow-sm
              border border-gray(200 dark:700)
              ${styles.transform.primary} ${styles.bg.secondary}
              ring(1 black opacity-5) focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby={`dropdown-button-${this.#id}`}
            tabindex="-1"
            id={`dropdown-${this.#id}`}
          >
            <div class={tw`max-h-80 overflow-auto`}>
              {this.props.options
                .map((value) =>
                  typeof value === "string" ? { value, name: value } : value
                )
                .map(({ value, name }, i) =>
                  render(
                    <button
                      href="#"
                      class={`${tw`${
                        this.props.selected === value
                          ? styles.text.accentPrimary
                          : styles.text.secondary
                      } ${
                        this.props.selected === value ? styles.bg.tertiary : ""
                      }
                    ${styles.transform.primary} hover:(${styles.bg.tertiary} ${styles.text.primary})
                    px-5 py-2 w-full block text-sm font-bold font-primary text-left`}`}
                      role="menuitem"
                      tabindex="-1"
                      id={`menu-item-${i}`}
                      data-value={value}
                      onclick={this.props.onchange}
                    >
                      {name}
                    </button>,
                  )
                )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
