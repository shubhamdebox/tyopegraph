import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}
