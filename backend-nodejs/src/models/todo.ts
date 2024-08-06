import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user"; // Importe o modelo User

export interface ITodo extends Document {
  description: string;
  isComplete: boolean;
  createdAt: Date;
  user: IUser["_id"];
}

const TodoSchema: Schema = new Schema({
  description: { type: String, required: true },
  isComplete: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Todo = mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
