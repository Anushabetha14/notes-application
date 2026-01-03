import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all notes of logged-in user
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  // Load notes on page load
  useEffect(() => {
    fetchNotes();
  }, []);

  // Filter notes based on search
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Your Notes</h2>

        {/* Add Note Form */}
        <NoteForm refresh={fetchNotes} />

        {/* Search Bar */}
        <input
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Notes List */}
        <div style={{ marginTop: "20px" }}>
          <NotesList notes={filteredNotes} refresh={fetchNotes} />
        </div>
      </div>
    </>
  );
}
