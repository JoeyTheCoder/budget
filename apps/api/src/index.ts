import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { prisma } from '@acme/db';

const app = express();
app.use(cors({ origin: ['http://localhost:4200'] }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

// GET todos
app.get('/todos', async (_req, res) => {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(todos);
});

// POST /todos
const CreateTodo = z.object({ title: z.string().min(1) });
app.post('/todos', async (req, res) => {
  const parsed = CreateTodo.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  const todo = await prisma.todo.create({ data: { title: parsed.data.title } });
  res.status(201).json(todo);
});

// PATCH /todos/:id
const UpdateTodo = z.object({ done: z.boolean() });
app.patch('/todos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateTodo.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const updated = await prisma.todo.update({
    where: { id },
    data: { done: parsed.data.done },
  });
  res.json(updated);
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.todo.delete({ where: { id } });
  res.status(204).end();
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
