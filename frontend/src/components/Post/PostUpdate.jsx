import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {updatePostAction, userPostAction} from '../../Actions/post'
import './Post.css'

const PostUpdate = ({id,setUpdateDelete}) => {
    const dispatch = useDispatch();

    const [caption,setCaption]=useState('')
    const handleFormSubmit =(e)=>{
        e.preventDefault();
        dispatch(updatePostAction(id,caption));
        dispatch(userPostAction());
        dispatch(userPostAction());
    }
  return (
    <Box>
        <form className='postUpdate' onSubmit={handleFormSubmit}>
            <Typography variant='h4'>UPDATE CAPTION</Typography>
            <textarea cols={30} rows={10} onChange={(e)=>setCaption(e.target.value)}>

            </textarea>
            <Button type='submit' sx={{color : "#59CE8F" , border: "1px solid #59CE8F"}} onClick={()=>setUpdateDelete(false)}>Update</Button>

        </form>
    </Box>
  )
}

export default PostUpdate