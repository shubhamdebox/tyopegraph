import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { useRouter } from "next/router";


const USER_LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

export default function Login() {
  const router = useRouter();

  const [password, setpassword] = useState("");

  const [email, setemail] = useState("");

  const [login] = useMutation(USER_LOGIN);

  return (
    <>
      <div className="max-w-7xl mx-auto text-center grid place-items-center h-screen w-screen ">
        
        <form>
          <div className="grid grid-flow-row gap-4 ">
            <span className="text-2xl font-bold"> LOGIN </span>
            <input
              className="p-2 w-96  "
              type="email"
              placeholder="email"
              onChange={(event) => {
                setemail(event.target.value);
              }}
            />

            <input
              className="p-2 w-96"
              type="text"
              placeholder="password"
              required
              onChange={(event) => {
                setpassword(event.target.value);
              }}
            />
          </div>
          <button
            className="border-2 p-1 w-96 mt-4 border-sky-500"
            onClick={(e) => {
              e.preventDefault();
              login({
                variables: {
                  input: { email: email, password: password },
                },
              });
              router.push("/products");
            }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
