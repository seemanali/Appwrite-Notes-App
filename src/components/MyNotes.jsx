import React, { useEffect, useState } from 'react';
import NotesCard from './NotesCard';
import { useSelector } from 'react-redux';
import authservice from '../Appwrite/authFunctions';

function MyNotes() {
  const userId = useSelector((state) => state.user.userId);
  const [notesArray, setnotesArray] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNotes() {
    let ResponseData = await authservice.ListAllPrivateNotes(userId);
    if (ResponseData.success) {
      setLoading(false);
      setnotesArray(ResponseData.data.documents);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // Callback function to refresh the notes list
  const handleNoteDeletion = () => {
    fetchNotes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p>Loading...</p>
        ) : notesArray.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notesArray.map((note) => (
            <NotesCard
              key={note.$id}
              id={note.$id}
              title={note.title}
              content={note.content}
              ispublic={note.ispublic}
              onDelete={handleNoteDeletion} // Pass the callback to NotesCard
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MyNotes;
