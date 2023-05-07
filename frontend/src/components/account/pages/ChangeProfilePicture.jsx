import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { myProfileAction, profilePictureAction } from '../../../Actions/userAction';
import { userPostAction } from '../../../Actions/post';

const ChangeProfilePicture = ({setChangeProfilePicture}) => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
  
    const dispatch = useDispatch();
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
  
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setImage(Reader.result);
        }
      };
    };
    const submitHandler = (e) => {
      e.preventDefault();
      setChangeProfilePicture(false);
     dispatch(profilePictureAction(image,caption));

    };
  
    return (
      <Box
        sx={{
          height: "90vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form className="newPostForm" onSubmit={submitHandler}>
          <Typography sx={{ color: "white" }} variant="h4">
           PROFILE PICTURE
          </Typography>
          {image && (
            <img
              style={{ height: "100px", width: "100px", alignSelf: "center" }}
              src={image}
              alt="post"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <textarea
            type="text"
            placeholder="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Button sx={{ backgroundColor: "#59CE8F", color : "white" }} type="submit">
            POST
          </Button>
        </form>
      </Box>
    );
}

export default ChangeProfilePicture