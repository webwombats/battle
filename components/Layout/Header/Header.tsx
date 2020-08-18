import { FC } from "react";
import Link from "next/link";
import useSWR, { mutate } from "swr";

import { User } from "@prisma/client";
import fetcher from "@utils/fetcher";
import HeaderLoader from "@components/Loader";

export const useUser = () => {
  const { data, error } = useSWR<{ user: User }, Error>(
    `/api/auth/me`,
    fetcher
  );

  return {
    user: data && data.user,
    isLoading: !error && !data,
    isError: error,
  };
};

async function handleLogout() {
  try {
    await fetch(`/api/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    await mutate("/api/auth/me", null);
  } catch (error) {
    console.log({ error });
  }
}

const CreateBattleButton = () => (
  <Link href="/battle/create">
    <button className="inline-flex items-center bg-green-700 hover:bg-green-600 border-0 py-1 px-3 focus:outline-none rounded text-white mt-4 md:mt-0">
      Create Battle
    </button>
  </Link>
);

const SignInButton = () => (
  <Link href="/signin">
    <button className="inline-flex items-center bg-blue-700 hover:bg-blue-600 border-0 py-1 px-3 focus:outline-none rounded text-white mt-4 md:mt-0">
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
);

const LogOutButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center bg-blue-700 hover:bg-blue-600 border-0 py-1 px-3 focus:outline-none rounded text-white mt-4 md:mt-0"
  >
    Logout
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
);

const Content = () => {
  const { user, isLoading, isError } = useUser();

  return (
    <div className="flex space-x-4">
      {!isLoading && user && (
        <h3 className="self-center">Welcome back, {user?.email}</h3>
      )}
      <CreateBattleButton />

      {/* {isLoading && (
        <HeaderLoader
          backgroundColor="#2b6cb0"
          foregroundColor="#3182ce"
          className="inline-flex items-center mt-4 md:mt-0"
        />
      )} */}
      {!isLoading && user ? (
        <LogOutButton onClick={handleLogout} />
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

const Header = () => {
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

        <Content></Content>
      </div>
    </header>
  );
};

export default Header;
