import { Schema, Types, model } from 'mongoose';

const userSchema = new Schema<IUser>({
    username: String,
    password: String,
});

const todoSchema = new Schema<ITodo>({
    title: String,
    description: String,
    done: Boolean,
    userId: Types.ObjectId,
});

const User = model<IUser>('User', userSchema);
const Todo = model<ITodo>('Todo', todoSchema);

export default {
    User,
    Todo
}