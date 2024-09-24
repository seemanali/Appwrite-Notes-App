import React, { useEffect, useState } from 'react';
import NotesCard   from './NotesCard';
import authservice from '../Appwrite/authFunctions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
const Dashboard = () => {
 



  const navigate = useNavigate();
  const [notes, setnotes] = useState([])
  const [loading , setloading] = useState(true)
  const [errorMessage, seterrorMessage] = useState("")

  async function anotherFunction(){

    const Alldocuments = await authservice.ListPublicNotes()

    if(Alldocuments.success){
      setnotes(Alldocuments.data.documents)
      setloading(false)
    }
    else{
      seterrorMessage(Alldocuments.error)
    }
  }
  useEffect(()=>{
anotherFunction();
  },[])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Public Notes</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
       <p>{errorMessage}</p>
      {loading ? (
            <p>Loading...</p>
          ) : (
            notes.length === 0 ? (
              <p>No notes available</p>
            ) : (
              notes.map((note) => (
                <NotesCard
                  key={note.$id}
                  ispublic={true}
                  id={note.$id}
                  title={note.title}
                  content={note.content}
                />
              ))
            )
          )}
      </div>
    </div>
  );
};

export default Dashboard;
