import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import authservice from '../Appwrite/authFunctions';
import { useSelector } from 'react-redux';

import parse from "html-react-parser"



const Notes = () => {
  const userIdFromState = useSelector((state) => {return (state.user)});

  const NewNotes = useParams();
  const [noteContent, setnoteContent] = useState({});
  const [errorMessage, setErrorMessage] = useState("")
  const [stringcontent, setstringcontent] = useState("");

  async function anotherFunction() {
    let NoteData = await authservice.getSingleDocument(NewNotes.notesId);
    
    if (NoteData.success) {
      setnoteContent(NoteData.data); // Update the state with the new note data
      
      // Use the newly fetched data directly
      if (!NoteData.data.Public) {
        let realuserId = NoteData.data.userId;
  
        if (realuserId.trim() !== userIdFromState.userId.trim()) {
          setErrorMessage("Don't Be oversmart! this is not for You.");
        }
      }
      
    } else {
      setErrorMessage(NoteData.error);
    }
  }
  
  useEffect(() => {
    anotherFunction();
  }, []);




useEffect(()=>{
  if(noteContent.content){
    setstringcontent(String(noteContent.content));
  }
},[noteContent])


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      {
        errorMessage != "" ? (<><Link to="/mynotes" className="text-blue-500 hover:text-blue-700 flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link><p>{errorMessage}</p></>) : (<><div className="flex items-center mb-6">
          <Link to="/" className="text-blue-500 hover:text-blue-700 flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
          <h1 className="text-3xl font-bold mb-4">{noteContent.title}</h1>
          <div className="text-gray-800 leading-relaxed">
            {
            parse(stringcontent)}
          </div></>)}
    </div>

  );
};

export default Notes;
