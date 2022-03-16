const { User, Thought } = require("../models");

// When we query thoughts, perform a .find() method on the Thought model.
// Returning thought data in descending order - .sort().
const resolvers = {
  Query: {
    thoughts: async () => {
      return Thought.find().sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;
