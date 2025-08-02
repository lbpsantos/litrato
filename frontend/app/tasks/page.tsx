'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get('http://localhost:8000/api/tasks/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const handleCreate = async () => {
    const token = localStorage.getItem('access');
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/tasks/',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Create Task Error:', error);
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      const token = localStorage.getItem('access');
      await axios.put(
        `http://localhost:8000/api/tasks/${task.id}/`,
        { ...task, completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://localhost:8000/api/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3 text-gray-800"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3 text-gray-800"
      />
      <button
        onClick={handleCreate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Create Task
      </button>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-4 p-4 border rounded shadow-sm bg-gray-50 text-gray-800"
          >
            <div className="font-semibold">{task.title}</div>
            <div>{task.description}</div>
            <div className="mt-2">
              Status: {task.completed ? '✅ Completed' : '❌ Incomplete'}
            </div>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => toggleComplete(task)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Toggle Complete
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
