import React, { useEffect, useId, useRef, useState } from 'react';

const PRIORITIES = [ "Low", "Medium", "High" ];

const PRIORITY_STYLES = {
  Low: "bg-[#E8DCC4] text-[#4A3426]",
  Medium: "bg-[#C8A46E] text-[#2F1F15]",
  High: "bg-[#6B4F3A] text-[#FBF7EE]",
};

const FIELD_CLASS =
  "w-full px-3 py-2 bg-white text-[#4A3426] placeholder-[#A08870] border border-[#C8B18F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]";

const LABEL_CLASS = "text-sm font-semibold text-[#6B4F3A]";

const CARD_CLASS =
  "bg-[#FFFDF8] border border-[#E2D3B8] rounded-xl p-4 sm:p-5";

const BUTTON_PRIMARY =
  "px-4 py-2 rounded-lg bg-[#8B5E3C] text-[#FBF7EE] font-semibold hover:bg-[#6F4A2E]";

const BUTTON_SECONDARY =
  "px-3 py-1.5 rounded-md text-sm bg-[#D9C7A6] text-[#4A3426] hover:bg-[#C8B18F]";

const BUTTON_DANGER =
  "px-3 py-1.5 rounded-md text-sm bg-[#6B4F3A] text-[#FBF7EE] hover:bg-[#4A3426]";

function Tasks() {
  const titleId = useId();
  const descriptionId = useId();
  const priorityId = useId();
  const titleInputRef = useRef(null);

  const [ tasks, setTasks ] = useState([]);

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ priority, setPriority ] = useState("Medium");

  const [ editingId, setEditingId ] = useState(null);
  const [ editDraft, setEditDraft ] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);


  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  function handleAdd(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    if (trimmedTitle === "" || trimmedDescription === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      description: trimmedDescription,
      priority,
      completed: false,
    };

    setTasks([ ...tasks, newTask ]);
    setTitle("");
    setDescription("");
    setPriority("Medium");
    titleInputRef.current.focus();
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditDraft({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function saveEdit(id) {
    const trimmedTitle = editDraft.title.trim();
    const trimmedDescription = editDraft.description.trim();
    if (trimmedTitle === "" || trimmedDescription === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
            ...task,
            title: trimmedTitle,
            description: trimmedDescription,
            priority: editDraft.priority,
          }
          : task
      )
    );
    setEditingId(null);
  }

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Dashboard statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`${CARD_CLASS} text-center`}>
          <p className="text-2xl font-bold text-[#4A3426]">{total}</p>
          <p className="text-sm text-[#6B4F3A]">Total tasks</p>
        </div>
        <div className={`${CARD_CLASS} text-center`}>
          <p className="text-2xl font-bold text-[#4A3426]">{completed}</p>
          <p className="text-sm text-[#6B4F3A]">Completed</p>
        </div>
        <div className={`${CARD_CLASS} text-center`}>
          <p className="text-2xl font-bold text-[#4A3426]">{pending}</p>
          <p className="text-sm text-[#6B4F3A]">Pending</p>
        </div>
        <div className={`${CARD_CLASS} text-center`}>
          <p className="text-2xl font-bold text-[#4A3426]">{percentage}%</p>
          <p className="text-sm text-[#6B4F3A]">Completed rate</p>
        </div>
      </div>

      {/* Add task form */}
      <form onSubmit={handleAdd} className={`${CARD_CLASS} flex flex-col gap-3`}>
        <h2 className="text-xl font-semibold text-[#4A3426] font-serif">
          Add a task
        </h2>

        <div className="flex flex-col gap-1">
          <label htmlFor={titleId} className={LABEL_CLASS}>
            Title
          </label>
          <input
            id={titleId}
            ref={titleInputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className={FIELD_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={descriptionId} className={LABEL_CLASS}>
            Description
          </label>
          <textarea
            id={descriptionId}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some detail"
            rows={3}
            className={FIELD_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={priorityId} className={LABEL_CLASS}>
            Priority
          </label>
          <select
            id={priorityId}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={FIELD_CLASS}
          >
            {PRIORITIES.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={`${BUTTON_PRIMARY} self-end`}>
          Add task
        </button>
      </form>

      {/* Task list */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-[#4A3426] font-serif">
          Your tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-center text-[#6B4F3A] py-6">
            No tasks yet. Add one above.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {tasks.map((task) => {
              const isEditing = task.id === editingId;

              if (isEditing) {
                return (
                  <li key={task.id} className={`${CARD_CLASS} flex flex-col gap-2`}>
                    <input
                      value={editDraft.title}
                      onChange={(e) =>
                        setEditDraft({ ...editDraft, title: e.target.value })
                      }
                      className={FIELD_CLASS}
                      aria-label="Edit title"
                    />
                    <textarea
                      value={editDraft.description}
                      onChange={(e) =>
                        setEditDraft({ ...editDraft, description: e.target.value })
                      }
                      rows={3}
                      className={FIELD_CLASS}
                      aria-label="Edit description"
                    />
                    <select
                      value={editDraft.priority}
                      onChange={(e) =>
                        setEditDraft({ ...editDraft, priority: e.target.value })
                      }
                      className={FIELD_CLASS}
                      aria-label="Edit priority"
                    >
                      {PRIORITIES.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className={BUTTON_SECONDARY}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(task.id)}
                        className={BUTTON_PRIMARY}
                      >
                        Save
                      </button>
                    </div>
                  </li>
                );
              }

              return (
                <li key={task.id} className={`${CARD_CLASS} flex flex-col gap-2`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggle(task.id)}
                      className="mt-1 h-4 w-4 accent-[#8B5E3C]"
                      aria-label={`Mark "${task.title}" as completed`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`font-semibold break-words ${task.completed
                            ? "line-through text-[#A08870]"
                            : "text-[#4A3426]"
                            }`}
                        >
                          {task.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_STYLES[ task.priority ]}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <p
                        className={`text-sm break-words ${task.completed ? "text-[#A08870]" : "text-[#6B4F3A]"
                          }`}
                      >
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => startEdit(task)}
                      className={BUTTON_SECONDARY}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(task.id)}
                      className={BUTTON_DANGER}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Tasks;