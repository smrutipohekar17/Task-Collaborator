import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {message} from 'antd';
import {GetLoggedInUser} from '../apicalls/users'
import {useDispatch, useSelector} from 'react-redux';
import {SetUser} from "../redux/usersSlice";
import { SetLoading} from "../redux/loadersSlice";
function ProtectedPage({children}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const getUser = async () => {

        try {
            dispatch(SetLoading(true))
            const response = await GetLoggedInUser();
            dispatch(SetLoading(false))
            if(response.success){
              dispatch(SetUser(response.data))
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(SetLoading(false))
            message.error(error.message)
            localStorage.removeItem('token')
            navigate('./login')

        }
    };

    useEffect(() =>{
        if(localStorage.getItem("token")){
            getUser();
        }
        else{
            navigate("/login");
        }
    
    }, []);
  return (
    <div>
     <div
     className="flex justify-between items-center bg-primary text-white px-5 py-3">
      <h1 className= "text-2xl cursor-pointer"
      onClick ={() => navigate("/")}
      > SHEY TRACKER </h1>
      <div className="flex items-center bg-white px-5 py-3 rounded">
          <span className=" text-primary cursor-pointer underline"
          onClick = {()=> navigate("/profile")}
          >{user?.firstName}</span>
            <i className="ri-notification-line text-white mx-2 bg-gray-500 p-2 rounded-full"></i>
            <i className="ri-logout-box-r-line ml-10 text-primary"
            onClick={() =>{
                localStorage.removeItem("token");
                navigate("./login");
               }}
            ></i>
       
      </div>

     </div>
       <div className="px-5 py-3">
        {children}
       </div>
    </div>
  );
}

export default ProtectedPage;