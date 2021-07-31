let classNames = require('classnames');

const nav = classNames({ "bg-yellow-600":true  });
const navDesktop = classNames(["max-w-7xl", "mx-auto", "px-2", "sm:px-6", "lg:px-8"]);
const navButtons = classNames(["relative","flex","items-center","justify-between","h-16"]);
const navButtonsMenu = classNames(["flex-1","flex","items-center","justify-center","sm:items-stretch","sm:justify-start"]);
const navButtonLogo = classNames(["flex-shrink-0","flex","items-center","text-white"]);
const navButtonsRouter = classNames(["hidden","sm:block","sm:ml-6"]);

export default function Nav() {
  return (
    <nav class={nav}>
      <div class={navDesktop}>
        <div class={navButtons}>         
          <div class={navButtonsMenu}>
            <div class={navButtonLogo}>
              {/* logo */}
            </div>
            <div class={navButtonsRouter}>
              <div class="flex space-x-4">
                <a
                  href="#"
                  class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Team
                </a>

                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Projects
                </a>

                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Calendar
                </a>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
           
            <div class="ml-3 relative">
              <div>
                <button
                  type="button"
                  class="bg-gray-800 flex text-sm p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  Sign Out
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
}
