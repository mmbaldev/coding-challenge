import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(router.query.error);
  const [validationError, setValidationError] = useState({});

  function validationErrors(setErrors: boolean = true) {
    let errors = {};
    if (!username) {
      errors = { ...errors, username: "Username is required!" };
    }
    if (!password) {
      errors = { ...errors, password: "Password is required!" };
    }

    if (setErrors) {
      setValidationError(errors);
    }
    return errors ? Object.keys(errors).length > 0 : false;
  }

  async function handleLogin(e) {
    e.preventDefault();

    const hasValidationErrors = validationErrors(true);
    if (hasValidationErrors) {
      return;
    }
    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    if (result.error) {
      setError("Username and password do not match!");
    } else {
        let nextUrl = "/";
      router.push(nextUrl);
  }

  return (
    <div className="w-screen h-screen bg-cover bg-[url('/images/login/background.png')]">
      <form onSubmit={handleLogin}>
        <div className="grid content-center w-full h-screen backdrop-blur-sm">
          <div className="flex flex-col w-96 h-auto mx-auto bg-white rounded-xl items-center shadow-2xl">
            <div
              className={`flex gap-1 p-3 h-24 w-5/6 bg-gradient-to-tl from-[#174564] to-[#008fd5] -mt-10 rounded-xl text-white font-bold text-xl`}>
              <span className="mt-5 ml-3">Neosfer</span>
            </div>
            <div className="flex flex-col gap-8 mt-16 w-full px-8">
              <div>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Username"
                />
                {"username" in validationError && (
                  <div className="text-red-400 mt-2 ml-2 text-xs">
                    {validationError.username}
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                />
                {"password" in validationError && (
                  <div className="text-red-400 mt-2 ml-2 text-xs">
                    {validationError.password}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`w-5/6 my-10 h-10 bg-gradient-to-tl from-[#174564] to-[#008fd5] hover:bg-[#008fd5]`}>
              Login
            </button>
            {error && <div className="text-red-400 my-2 text-xs">{error}</div>}
          </div>
        </div>
      </form>
    </div>
  );
}
