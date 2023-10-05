import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  // apollo client
  const client = new ApolloClient({
    uri: "http://localhost:1337",
    cache: new InMemoryCache(),
  });

  return (
    <ClerkProvider {...pageProps}>
      <ApolloProvider client={client}>
          <Component {...pageProps} />
      </ApolloProvider>
    </ClerkProvider>
  );
}
