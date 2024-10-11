import express from "express";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/database.js";
import schema from "./graphql/schema.js";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  await connectDB();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((error) => console.log("Server startup error:", error));
