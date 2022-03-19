import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

// Establish new link to GraphQL server at/graphql endpoint.
const httpLink = createHttpLink({
  uri: "/graphql",
});

// After create link, ApolloClient() instantiates the Apollo Client and create connection to the API endpoint.
// New cache object using new InMemoryCache().
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Wrap entire returning code - pass client variable as the value for client prop in provider - eveything between the JSX tags will eventually
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
