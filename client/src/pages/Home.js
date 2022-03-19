import React from "react";
// Will allow us to make requests to the GraphQL server we connected to and made available to application using ApolloProvider component in App.js.
import { useQuery } from "@apollo/client";
// Need to use Hook and we'll be able to query thought data.
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";

const Home = () => {
  // use useQuery hook to make query request
  // Loading property to indicate request isn't done, when finished and have data returned from server, information is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {/* Use ternary operator to conditionally render the ThoughtList component. */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
