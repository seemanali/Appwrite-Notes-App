import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loggedOut } from '../GlobalStateStore/StateDefiner'
import authservice from '../Appwrite/authFunctions'
import { useNavigate } from 'react-router-dom'
function Logout() {



  const userData = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function anotherFunction(){
      if(!userData.loginStatus){
        navigate("/")
      }
      // console.log();
        let data = await authservice.LogOut_Function();
        if(data.success){
            dispatch(loggedOut());
            navigate("/")
        }
    }

    useEffect(()=>{
        anotherFunction();
    },[])
  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
