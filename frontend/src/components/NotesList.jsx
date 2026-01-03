import NoteItem from "./NoteItem";

export default function NotesList({ notes, refresh }) {
  return (
    <>
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          refresh={refresh}
        />
      ))}
    </>
  );
}
