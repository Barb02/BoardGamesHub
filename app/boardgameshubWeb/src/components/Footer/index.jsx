import { FaGithub } from "react-icons/fa";

function Footer() {
    return (
    <footer class="w-full bg-navbar inset-x-0 bottom-0">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 BoardGamesHub™. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="/about" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
                <a href="https://github.com/Barb02/BoardGamesHub"><FaGithub /></a>
            </li>
        </ul>
        </div>
    </footer>

    );
  }
  
  export default Footer;