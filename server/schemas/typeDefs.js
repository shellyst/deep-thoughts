// Import the GQL tagged template function.
const { gql } = require("apollo-server-express");

// Create our typeDefs.
// Type definitions need to specify what type of data is expected in return.
// Instructing query that we'll return an array.

// Able to instruct the thoughts query so that each tought can include _id, thoughtText, username, reactionCount.
// ID: same as String except looking for a unique identifier.
// INT integer.
const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
  }

  type Query {
    thoughts: [Thought]
  }
`;

// Export the typeDefs.
module.exports = typeDefs;
