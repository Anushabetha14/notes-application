import { useState } from "react";
import api from "../services/api";

export default function NoteForm({ refresh }) {
  const [note, setNote] = useState({ title: "", content: "" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/notes", note);
    setNote({ title: "", content: "" });
    refresh();
  };

  return (
    <form onSubmit={submit} style={styles.form}>
      <input
        placeholder="Note title"
        value={note.title}
        onChange={e => setNote({ ...note, title: e.target.value })}
        required
      />

      <textarea
        placeholder="Note content"
        value={note.content}
        onChange={e => setNote({ ...note, content: e.target.value })}
        required
      />

      <button>Add Note</button>
    </form>
  );
}

const styles = {
  form: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px"
  }
};
