import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";

const GET_ALL_PRODUCTS = gql`
  query products {
    products {
      productId
      name
      description
    }
  }
`;

const SEARCH_SINGLE_PRODUCT = gql`
  query product($input: GetProductInput!) {
    product(input: $input) {
      _id
      productId
      price
      name
      description
    }
  }
`;

export default function Main() {
  
  const [productSearched, setproductSearched] = useState("");

  //TO GET ALL PRODUCTS
  const { data, loading, refetch, error } = useQuery(GET_ALL_PRODUCTS);

  //TO GET SINGLE PRODUCT
  const [fetchProduct, { data: productSearchedData, error: movieError }] = useLazyQuery(SEARCH_SINGLE_PRODUCT);

  
  return (
    <>
    <div className="max-w-7xl mx-auto text-center grid place-items-center h-screen w-screen">
     <div>
      <input
        className="m-9 p-2 w-60"
        type="text"
        placeholder="ProductID..."
        onChange={(event) => {
          setproductSearched(event.target.value);
        }}
      />
       <button
        className="border-2 p-1 w-40 mt-4 border-sky-500"
          onClick={() => {
            fetchProduct({
              variables: {
                input:{
                    productId : productSearched,
                }
              },
            });
          }}
        > 
          Fetch Data
        </button>
      </div>
      <div>
          {productSearchedData && (
            <div className="m-9 p-2  ">
              <h1>name: {productSearchedData.product.name}</h1>
              <h1>Description: {productSearchedData.product.description}</h1>
              <h1>ProductID: {productSearchedData.product.productId}</h1>
              <h1>_ID: {productSearchedData.product._id}</h1>
             {" "}
            </div>
          )}
          {movieError  && <h1 className="m-9 p-2  "> There was an error fetching the data</h1>}
        </div>
      <div className=" ">
        <span className=" font-bold ">All Products</span>
        <table className="table-auto  border-2 border-indigo-400 m-2 ">
          <thead>
            <tr>
              <th className=" border-2 border-indigo-400">productId</th>
              <th className=" border-2 border-indigo-400">Name</th>
              <th className=" border-2 border-indigo-400">Description</th>
            </tr>
          </thead>
          {data &&
            data.products.map((value: any) => {
              return (
                <tbody
                  key={value.productId}
                  className=" border-2 border-indigo-400"
                >
                  <tr>
                    <td className="p-5 border-2 border-indigo-400">
                      {value.productId}
                    </td>
                    <td className="p-5 border-2 border-indigo-400">
                      {value.name}
                    </td>
                    <td className="p-5 border-2 border-indigo-400">
                      {value.description}
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
      </div>
    </>
  );
}
