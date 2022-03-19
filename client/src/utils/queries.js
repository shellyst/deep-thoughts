// This file stores all GraphQL query requests.
import { gql } from "@apollo/client";

// We can import and use this query function by name and use it where we need throughout front-end application.
// Will be used on the HOMEPAGE, so needs to be imported into Home.js.
export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;
