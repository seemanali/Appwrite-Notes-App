import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authservice from '../Appwrite/authFunctions';
import { Loader } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react'; // Import TinyMCE editor

const NotesForm = () => {
    const DocumentIdFromURL = useParams();
    const navigate = useNavigate();
    let userIdFromState = useSelector((state) => state.user.userId);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isitPublic, setisitPublic] = useState(false);
    const [userId, setuserId] = useState("");
    const [loading, setloading] = useState(false);
    const [errorMessage, seterrorMessage] = useState("");

    async function LoadDocumentToedit() {
        let singleData = await authservice.getSingleDocument(DocumentIdFromURL.documentId);
        if (singleData.success) {
            setTitle(singleData.data.title);
            setDescription(singleData.data.content);
            setisitPublic(singleData.data.Public);
        }
    }

    useEffect(() => {
        setuserId(userIdFromState);
        if (DocumentIdFromURL.documentId) {
            LoadDocumentToedit();
        } else {
            setTitle("");
            setDescription("");
            setisitPublic(false);
        }
    }, [DocumentIdFromURL]);

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        let isValid = true;
        const newErrors = { title: '', description: '' };

        if (!title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setloading(true);
            console.log({ title, description, userId, isitPublic });

            let UploadNote = await authservice.uploadANewNote(title, description, userId, isitPublic);
            if (UploadNote.success) {
                navigate("/mynotes");
            } else {
                setloading(false);
                seterrorMessage(UploadNote.error);
            }
            setTitle('');
            setDescription('');
            setisitPublic(false);
        }
    };

    const updateNoteFunction = async (e) => {
        e.preventDefault();

        let UpdateFunctionResponse = await authservice.UpdateASingleDocument(DocumentIdFromURL.documentId, title, description, userId, isitPublic);

        if (UpdateFunctionResponse.success) {
            navigate("/mynotes");
        } else {
            setloading(false);
            seterrorMessage(UpdateFunctionResponse.error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <p className='text-center text-xl text-red-500'>{errorMessage}</p>
            <h2 className="text-2xl font-semibold mb-4">Create a Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full p-2 border rounded-md focus:outline-none ${errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter the title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <Editor
                    apiKey='2w55lps83a4h3uix1sm1lyo0um113u0t7kzhfvlpcz8s5fch'
                        value={description}
                        onEditorChange={(content) => setDescription(content)} // Set the editor content to the state
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">User ID</label>
                    <input
                        type="text"
                        value={userId}
                        readOnly
                        className="w-full p-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Visibility</label>
                    <select
                        value={isitPublic}
                        onChange={(e) => setisitPublic(!isitPublic)}
                        className="w-full p-2 border rounded-md focus:outline-none border-gray-300"
                    >
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select>
                </div>

                {loading ? (
                    <div className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    DocumentIdFromURL.documentId ? (
                        <div className="flex gap-1">
                            <Link to={"/mynotes"} className="w-full bg-red-500 text-center text-white py-2 rounded-md hover:bg-red-600">
                                Cancel
                            </Link>
                            <button
                                onClick={updateNoteFunction}
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                                Update Note
                            </button>
                        </div>
                    ) : (
                        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Add Note
                        </button>
                    )
                )}
            </form>
        </div>
    );
};

export default NotesForm;
