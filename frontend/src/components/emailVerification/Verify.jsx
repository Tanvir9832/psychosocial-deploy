import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {emailVerification} from '../../Actions/userAction';
const Verify = () => {
    const {id ,token}  = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(emailVerification(id,token));
        navigate("/");
    },[id,token]);
  return (
    <div style={{background  : "#000" ,height : "95vh" ,width : "100%"}}>

    </div>
  )
}

export default Verify