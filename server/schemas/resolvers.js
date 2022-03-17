const { User, Thought } = require("../models");

// When we query thoughts, perform a .find() method on the Thought model.
// Returning thought data in descending order - .sort().
const resolvers = {
  Query: {
    // Pass parent as a placeholder parameter - need something in first spot.
    // User ternary operator to check if username exists.
    // If exists: set params to object with username key set to that value.
    // If it doesn't, return an empty object.
    // Pass object to .find() which looks up by specific username.
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },

    // Destructure _id and place it into our .findOne() to look up single thought by its id.
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },

    // get all users
    users: async () => {
      return (
        User.find()
          // Leave out __v property and user's password information.
          .select("-__v -password")
          .populate("friends")
          .populate("thoughts")
      );
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    Mutation: {
      // Creates new user in database with whatever is passed in as the args.
      addUser: async (parent, args) => {
        const user = await User.create(args);
        return user;
      },
      login: async () => {},
    },
  },
};

module.exports = resolvers;
