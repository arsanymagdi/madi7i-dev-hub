// src/components/NewProjectModal.jsx
import { useState } from "react";
import { database, auth } from "@/lib/firebase";
import { ref, push, set, serverTimestamp } from "firebase/database";

export default function NewProjectModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [users, setUsers] = useState([{ id: "", name: "", role: "" }]);
  const [todos, setTodos] = useState([""]);
  const [notes, setNotes] = useState([""]);
  const [tasks, setTasks] = useState([{ title: "", assignedTo: "" }]);

  const addProjectToFirebase = async () => {
    const newProjectRef = push(ref(database, "projects"));
    const projectId = newProjectRef.key;

    const projectData = {
      title,
      description,
      createdAt: new Date().toISOString(),
      createdBy: "userId1", // Replace with auth context
      users: {},
      todos: {},
      notes: {},
      tasks: {}
    };

    users.forEach((user, index) => {
      if (user.id && user.name) {
        projectData.users[user.id] = {
          name: user.name,
          role: user.role || "Contributor"
        };
      }
    });

    todos.forEach((todo, i) => {
      if (todo.trim()) {
        projectData.todos[`todo${i}`] = {
          text: todo,
          completed: false
        };
      }
    });

    notes.forEach((note, i) => {
      if (note.trim()) {
        projectData.notes[`note${i}`] = {
          content: note,
          author: "userId1", // Replace with auth
          timestamp: new Date().toISOString()
        };
      }
    });

    tasks.forEach((task, i) => {
      if (task.title) {
        projectData.tasks[`task${i}`] = {
          title: task.title,
          assignedTo: task.assignedTo,
          status: "todo"
        };
      }
    });

    await set(newProjectRef, projectData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>

        {/* Project Info */}
        <input
          type="text"
          placeholder="Project Title"
          className="w-full border p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Users */}
        <h3 className="text-lg font-semibold">Users</h3>
        {users.map((user, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              placeholder="User ID"
              className="border p-1 w-1/3"
              value={user.id}
              onChange={(e) => {
                const updated = [...users];
                updated[idx].id = e.target.value;
                setUsers(updated);
              }}
            />
            <input
              placeholder="Name"
              className="border p-1 w-1/3"
              value={user.name}
              onChange={(e) => {
                const updated = [...users];
                updated[idx].name = e.target.value;
                setUsers(updated);
              }}
            />
            <input
              placeholder="Role"
              className="border p-1 w-1/3"
              value={user.role}
              onChange={(e) => {
                const updated = [...users];
                updated[idx].role = e.target.value;
                setUsers(updated);
              }}
            />
          </div>
        ))}
        <button className="text-blue-600 text-sm mb-4" onClick={() => setUsers([...users, { id: "", name: "", role: "" }])}>
          + Add User
        </button>

        {/* Todos */}
        <h3 className="text-lg font-semibold">Todos</h3>
        {todos.map((todo, idx) => (
          <input
            key={idx}
            placeholder="Todo"
            className="border p-1 mb-2 w-full"
            value={todo}
            onChange={(e) => {
              const updated = [...todos];
              updated[idx] = e.target.value;
              setTodos(updated);
            }}
          />
        ))}
        <button className="text-blue-600 text-sm mb-4" onClick={() => setTodos([...todos, ""])}>
          + Add Todo
        </button>

        {/* Notes */}
        <h3 className="text-lg font-semibold">Notes</h3>
        {notes.map((note, idx) => (
          <textarea
            key={idx}
            placeholder="Note"
            className="border p-1 mb-2 w-full"
            value={note}
            onChange={(e) => {
              const updated = [...notes];
              updated[idx] = e.target.value;
              setNotes(updated);
            }}
          />
        ))}
        <button className="text-blue-600 text-sm mb-4" onClick={() => setNotes([...notes, ""])}>
          + Add Note
        </button>

        {/* Tasks */}
        <h3 className="text-lg font-semibold">Tasks</h3>
        {tasks.map((task, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              placeholder="Task Title"
              className="border p-1 w-2/3"
              value={task.title}
              onChange={(e) => {
                const updated = [...tasks];
                updated[idx].title = e.target.value;
                setTasks(updated);
              }}
            />
            <input
              placeholder="Assign to (userId)"
              className="border p-1 w-1/3"
              value={task.assignedTo}
              onChange={(e) => {
                const updated = [...tasks];
                updated[idx].assignedTo = e.target.value;
                setTasks(updated);
              }}
            />
          </div>
        ))}
        <button className="text-blue-600 text-sm mb-4" onClick={() => setTasks([...tasks, { title: "", assignedTo: "" }])}>
          + Add Task
        </button>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button
            onClick={addProjectToFirebase}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}
