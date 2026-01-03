import { useState } from "react";
import api from "../services/api";

export default function NoteItem({ note, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({
    title: note.title,
    content: note.content,
  });

  // DELETE NOTE
  const deleteNote = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      refresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // UPDATE NOTE  ✅ FIXED
  const updateNote = async () => {
    try {
      await api.put(`/notes/${note._id}`, editNote); // 👈 MUST await
      setIsEditing(false);                            // exit edit mode
      refresh();                                     // reload notes
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };

  return (
    <div style={styles.card}>
      {isEditing ? (
        <>
          <input
            value={editNote.title}
            onChange={(e) =>
              setEditNote({ ...editNote, title: e.target.value })
            }
          />

          <textarea
            value={editNote.content}
            onChange={(e) =>
              setEditNote({ ...editNote, content: e.target.value })
            }
          />

          <div style={styles.actions}>
            <button onClick={updateNote}>Save</button>

            <button
              style={{ background: "#6b7280" }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div style={styles.actions}>
            <button
              style={{ background: "#16a34a" }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              style={{ background: "#dc2626" }}
              onClick={deleteNote}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
};
