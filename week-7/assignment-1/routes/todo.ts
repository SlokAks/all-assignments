import express from 'express';
import middleware from '../middleware/index';
import { Request, Response } from 'express';
import db from '../db';
const router = express.Router();

const Todo = db.Todo;
const { authenticateJwt, SECRET } = middleware;

router.post('/todos', authenticateJwt, (req: Request, res: Response) => {
  const { title, description } = req.body;
  const done = false;
  const userId = req.headers.userId;

  const newTodo = new Todo({ title, description, done, userId });

  newTodo.save()
    .then((savedTodo: ITodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req: Request, res: Response) => {
  const userId = req.headers.userId;

  Todo.find({ userId })
    .then((todos: ITodo | unknown) => {
      res.json(todos);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req: Request, res: Response) => {
  const { todoId } = req.params;
  const userId = req.headers.userId;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo: ITodo | unknown) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;