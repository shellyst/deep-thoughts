// Import the GQL tagged template function.
const { gql } = require("apollo-server-express");

// Create our typeDefs.
// Type definitions need to specify what type of data is expected in return.
// Instructing query that we'll return an array.

// Able to instruct the thoughts query so that each tought can include _id, thoughtText, username, reactionCount.
// ID: same as String except looking for a unique identifier.
// INT integer.
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;
// Auth data must return a token and can optionally include any other user data.

// Export the typeDefs.
module.exports = typeDefs;
