import React from 'react';
import { Edit, Trash, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import authservice from '../Appwrite/authFunctions';
import toast, { Toaster } from 'react-hot-toast';
import parse from "html-react-parser";

const NotesCard = ({ ispublic, id, title, content, onDelete }) => {

  // Function to truncate content to 150 characters
  const truncateContent = (htmlString, limit = 150) => {
    const plainText = htmlString.replace(/<[^>]+>/g, ''); // Strip out HTML tags
    return plainText.length > limit ? plainText.substring(0, limit) + '...' : plainText;
  };

  async function HandleTrash() {
    // Show a loading toast
    const toastId = toast.loading("Deleting note...");

    try {
      const DeleteFunctionResponse = await authservice.DeleteASingleDocument(id);
      if (DeleteFunctionResponse.success) {
        // Update the toast to success
        toast.success("Document Deleted", { id: toastId });
        onDelete(); // Trigger the callback to refresh notes in the parent component
      } else {
        // Update the toast to error if deletion fails
        toast.error("Failed to delete document", { id: toastId });
      }
    } catch (error) {
      // Update the toast to error if there was an exception
      toast.error(`Error: ${error.message}`, { id: toastId });
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Toaster />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">
        {parse(truncateContent(content))}
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={`/notes/${id}`}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <Eye className="w-5 h-5 mr-1" />
          View
        </Link>
        <div className="flex space-x-2">
          {!ispublic && (
            <>
              <Link to={`/notesform/${id}`} className="text-blue-500 hover:text-blue-700">
                <Edit className="w-5 h-5" />
              </Link>
              <button
                onClick={HandleTrash}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
