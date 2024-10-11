// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = `
  type Habit {
    id: ID!
    name: String!
    description: String
  }

  type Query {
    habits: [Habit]
  }

  type Mutation {
    addHabit(name: String!, description: String): Habit
    deleteHabit(id: ID!): Habit
    updateHabit(id: ID!, name: String!, description: String): Habit
  }
`;

const Habit = mongoose.model(
  "Habit",
  new mongoose.Schema({
    name: String,
    description: String,
  })
);

const resolvers = {
  Query: {
    habits: async () => await Habit.find(),
  },
  Mutation: {
    addHabit: async (_, { name, description }) => {
      const habit = new Habit({ name, description });
      await habit.save();
      return habit;
    },
    deleteHabit: async (_, { id }) => {
      const habit = await Habit.findByIdAndDelete(id);
      return habit;
    },
    updateHabit: async (_, { id, name, description }) => {
      const habit = await Habit.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      return habit;
    },
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("MongoDB connection error:", err);
    });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((error) => console.log(error));
