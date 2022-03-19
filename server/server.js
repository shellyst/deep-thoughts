const express = require("express");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const path = require("path");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  // Provide type defintions and resolvers so they know what our API looks like and how it resolves requests.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    // Ensures every request performs an authentication check and the updated request object will be passed to the resolvers as the context.
  });
  // Start the Apollo server
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });
  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets.
// Check if Node environment is in production - if yes, instruct Express server to serve any files in the React application's build directory in the client folder.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Wildcard GET route for the server. If we make GET request to any location on server without route defined, respond with production-ready React front-end code.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
