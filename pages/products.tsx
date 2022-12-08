import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";

const CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      price
      productId
      name
      description
    }
  }
`;

export default function Products() {
  const [createProducts, { error }] = useMutation(CREATE_PRODUCT);

  const [price, setprice] = useState("");
  const [productId, setproductId] = useState("");
  const [description, setdescription] = useState("");
  const [name, setname] = useState("");

  return (
    <>
      <div className="max-w-7xl mx-auto text-center grid place-items-center h-screen w-screen ">
        <form>
          <div className="grid grid-flow-row gap-4 ">
            <span className="text-2xl font-bold"> Add product </span>
            <input
              className="p-2 w-96  "
              type="text"
              placeholder="name"
              value={name}
              onChange={(event) => {
                setname(event.target.value);
              }}
            />

            <input
              className="p-2 w-96"
              type="text"
              placeholder="product id"
              value={productId}
              required
              onChange={(event) => {
                setproductId(event.target.value);
              }}
            />

            <input
              className="p-2 w-96"
              type="number"
              placeholder="price"
              required
              value={price}
              onChange={(event) => {
                setprice(event.target.value);
              }}
            />

            <textarea
              className="p-2 w-96"
              placeholder="descriptions"
              required
              value={description}
              onChange={(event) => {
                setdescription(event.target.value);
              }}
            />
          </div>

          <button
            className="border-2 p-1 w-96 mt-4 border-sky-500"
            onClick={() => {
              createProducts({
                variables: {
                  input: {
                    price: price,
                    productId: productId,
                    name: name,
                    description: description,
                  },
                },
              });
            }}
          >
            Add product
          </button>

          {error && (
            <h1 className="m-9 p-2  "> There was an error adding the data</h1>
          )}
        </form>
      </div>
    </>
  );
}
