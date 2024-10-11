
import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  name: String,
  description: String,
  completedDates: [Date],
});

const Habit = mongoose.model("Habit", HabitSchema);
export default Habit;
