import axios from 'axios';
import { React ,useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';


    
    // const jwt = localStorage.getItem("token");
    const useAuth=()=>{
        const user = localStorage.getItem("token");
        
        if(user!=null){
            return true;
        }
        else{
            return false;
        }
    }
    const  PrivateRoutes=()=> {
      const auth = useAuth();
    return (auth===true ? <Outlet /> : <Navigate to="/login"/>);
}

export default PrivateRoutes;