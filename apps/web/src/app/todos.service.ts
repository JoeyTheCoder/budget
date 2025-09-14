import axios from 'axios';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const TodosApi = {
  list: async (): Promise<Todo[]> => {
    const { data } = await api.get('/todos');
    return data;
  },
  create: async (title: string): Promise<Todo> => {
    const { data } = await api.post('/todos', { title });
    return data;
  },
  toggle: async (id: number, done: boolean): Promise<Todo> => {
    const { data } = await api.patch(`/todos/${id}`, { done });
    return data;
  },
  remove: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  }
};
