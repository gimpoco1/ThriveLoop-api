import Habit from "../models/habit.model.js";

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
    markHabitComplete: async (_, { id, date }) => {
      const habit = await Habit.findByIdAndUpdate(
        id,
        { $addToSet: { completedDates: new Date(date) } }, // Avoid duplicates
        { new: true }
      );
      return habit;
    },
  },
};

export default resolvers;
