import React, { useEffect, useState } from 'react';
import { Edit, ImagePlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authservice from '../Appwrite/authFunctions';

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, seterror] = useState("")
  const [imageURl, setImageURl] = useState("")

  useEffect(() => {
    if (!user.loginStatus) {
      navigate("/login");
    }
    // console.log(user);


  }, [navigate, user.loginStatus]);



  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-6">
        
        <div>
          <p>{error}</p>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.userId}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
       
      </div>

      
    </div>
  );
};

export default Profile;
