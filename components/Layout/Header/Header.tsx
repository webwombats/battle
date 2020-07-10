import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        return;
      }

      setUser(data);
    };

    fetchData();
  }, []);

  return (
    <header className="text-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-white">battle</span>
          </a>
        </Link>

        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-400">First Link</a>
          <a className="mr-5 hover:text-gray-400">Second Link</a>
          <a className="mr-5 hover:text-gray-400">Third Link</a>
          <a className="mr-5 hover:text-gray-400">Fourth Link</a>
        </nav>

        {
          // @ts-ignore
          (user && !user.error && <p>You're signed in as {user.email}</p>) || (
            <Link href="/signin">
              <button className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-gray-900 mt-4 md:mt-0">
                Sign In
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          )
        }
      </div>
    </header>
  );
};

export default Header;
