import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Habit {
    id: ID!
    name: String!
    description: String
    completedDates: [String]
  }

  type Query {
    habits: [Habit]
  }

  type Mutation {
    addHabit(name: String!, description: String): Habit
    deleteHabit(id: ID!): Habit
    updateHabit(id: ID!, name: String!, description: String): Habit
    markHabitComplete(id: ID!, date: String!): Habit
  }
`;

export default typeDefs;
