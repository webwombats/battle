import { useState, useEffect } from "react";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import { useUser } from "@components/Layout/Header/Header";

import { PrismaClient, User } from "@prisma/client";
import { mutate } from "swr";

interface Props {
  users: User[];
}

const Field = ({
  name,
  label,
  type,
  autoComplete,
  required,
}: {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  required: boolean;
}) => {
  return (
    <label
      id={[name, "label"].join("-")}
      htmlFor={[name, "input"].join("-")}
      className="block mt-3"
    >
      <span className="text-white text-sm">
        {label} {required ? <span title="Required">*</span> : undefined}
      </span>
      <input
        autoComplete={autoComplete}
        id={[name, "input"].join("-")}
        name={name}
        required={required}
        type={type}
        className="px-3 py-2 mt-1 block w-full rounded-md bg-white border-gray-700 text-gray-800"
        readOnly
      />
    </label>
  );
};

function getErrorMessage(error) {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === "BAD_USER_INPUT"
      ) {
        return graphQLError.message;
      }
    }
  }
  return error.message;
}

const SignIn: NextPage<Props> = ({ users }) => {
  const [errorMsg, setErrorMsg] = useState();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      Router.replace("/");
    }
  }, [user]);

  // async function handleSubmit(e: React.SyntheticEvent) {
  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;

    try {
      const body = { email, password };
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.user) {
        mutate("/api/auth/me");
        await router.push("/");
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  async function handleSubmitTestUsers(email: string, password: string) {
    try {
      const body = { email, password };
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.user) {
        mutate("/api/auth/me");
        await router.push("/");
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mt-16 mx-6">
        <div className="p-6 max-w-sm w-full bg-gray-800 shadow rounded-md">
          <h3 className="text-white text-xl text-center">Sign In</h3>

          <form className="mt-4" onSubmit={handleSubmit}>
            {errorMsg && <p>{errorMsg}</p>}

            <Field
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email"
            />
            <Field
              name="password"
              type="password"
              autoComplete="password"
              required
              label="Password"
            />

            <div className="flex justify-between items-center mt-4">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500 bg-gray-800 border-gray-600"
                    name="remember"
                    id="remember"
                  />
                  <span className="mx-2 text-gray-200 text-sm">
                    Remember Me
                  </span>
                </label>
              </div>

              <div>
                <a
                  className="block text-sm text-blue-500 hover:underline"
                  href=""
                >
                  Forgot Your Password?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 text-center bg-blue-600 rounded-md text-white text-sm hover:bg-blue-500 focus:outline-none"
              >
                Login
              </button>

              <div className="text-center mt-4">
                <span className="text-white">or </span>
                <Link href="signup">
                  <a className="text-white underline">Sign up</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto my-12 text-white font-sans items-center justify-center mt-16 space-y-4">
        <h2 className="text-xl font-bold">TEST USERS</h2>
        {users.map((user) => (
          <div className="flex space-x-4" key={user.id}>
            <button
              className="border-gray-400 underline"
              onClick={() => handleSubmitTestUsers(user.email, "test123")}
            >
              Login
            </button>
            <span>as</span>
            <h2>
              {user.fullName} ({user.userName}, {user.role}) - {user.id}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

// TODO: Remove the getStaticProps from here completely
export async function getStaticProps() {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany();

  return {
    props: {
      users,
    },
    unstable_revalidate: 1,
  };
}

export default SignIn;
