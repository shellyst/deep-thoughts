const { User, Thought } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// When we query thoughts, perform a .find() method on the Thought model.
// Returning thought data in descending order - .sort().
const resolvers = {
  Query: {
    // Pass parent as a placeholder parameter - need something in first spot.
    // User ternary operator to check if username exists.
    // If exists: set params to object with username key set to that value.
    // If it doesn't, return an empty object.
    // Pass object to .find() which looks up by specific username.
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

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
  },
  Mutation: {
    // Creates new user in database with whatever is passed in as the args.
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addThought: async (parent, args, context) => {
      // Check for context.user because only logged-in users should be able to use this mutation.
      if (context.user) {
        const thought = await Thought.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          // Returns updated document.
          { new: true }
        );

        return thought;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedThought;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addFriend: async (parent, { friendId }, context) => {
      // Looks for incoming friendId and adds that to the current user's friends array.
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          // Prevent duplicate entries.
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
