import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { useRouter } from "next/router";

const USER_SIGNUP = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      name
      email
    }
  }
`;

export default function Signup() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const [createUser] = useMutation(USER_SIGNUP);



  return (
    <>
      <div className="max-w-7xl mx-auto text-center grid place-items-center h-screen w-screen">
        <form>
        <div className="grid grid-flow-row gap-4 ">
          <span className="text-2xl font-bold"> New user login </span>
          <input
            className="p-2 w-96"
            type="text"
            placeholder="Name"
            required
            onChange={(event) => {
              setName(event.target.value);
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
          <input
            className="p-2 w-96"
            type="email"
            placeholder="email"
            onChange={(event) => {
              setemail(event.target.value);
            }}
          />
          <button
            className="border-2 p-2 border-sky-500 "
            onClick={() => {
             
                createUser({
                  variables: {
                    input: { email, name, password },
                    fetchPolicy: "network-only"
                  },
                });
                router.push("/login");
           
            }}
          >
            Signup
          </button>
        </div>
        </form>
      </div>
    </>
  );
}
