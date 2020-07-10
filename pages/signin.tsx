import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Field = ({
  name,
  label,
  type,
  autoComplete,
  value,
  required,
}: {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  value?: string;
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
        value={value}
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

const SignIn = () => {
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  // async function handleSubmit(e: React.SyntheticEvent) {
  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;

    try {
      const body = { email, password };
      const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.user) {
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
              value="hi@mynameisyuri.com"
            />
            <Field
              name="password"
              type="password"
              autoComplete="password"
              required
              label="Password"
              value="test123"
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
    </>
  );
};

export default SignIn;
