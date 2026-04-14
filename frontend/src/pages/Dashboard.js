import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addOrUpdateTask = async () => {
    if (!title) return alert("Enter task title");

    if (editId) {
      await API.put(`/tasks/${editId}`, { title });
      setEditId(null);
    } else {
      await API.post("/tasks", { title });
    }

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";

    await API.put(`/tasks/${task.id}`, {
      title: task.title,
      status: newStatus
    });

    fetchTasks();
  };

  const startEdit = (task) => {
    setTitle(task.title);
    setEditId(task.id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <h2>Task Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Add / Edit */}
      <div className="task-input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addOrUpdateTask}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="task-card">
              <div>
                <h4 className={t.status === "completed" ? "done" : ""}>
                  {t.title}
                </h4>
                <p>Status: {t.status}</p>
              </div>

              <div className="actions">
                <button onClick={() => toggleStatus(t)}>
                  {t.status === "pending" ? "Complete" : "Undo"}
                </button>

                <button onClick={() => startEdit(t)}>Edit</button>

                <button onClick={() => deleteTask(t.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;