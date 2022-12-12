import React, { useState, useEffect } from 'react'
import { Box, TextField } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputAdornment from "@mui/material/InputAdornment";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import produce from 'immer';

const Notes = (props) =>
  props.data.map((note) => (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: "pink",
        p: 3,
        width: 128,
        height: 100,
      }}>
      <Typography
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PanoramaFishEyeIcon />
            </InputAdornment>
          ),
        }}>
        {note.text}
      </Typography>
    </Box>
  ));

const MainLayout = () => {
    const initialData = [{ text: "Loading Notes" }];
    const [data, setData] = useState(initialData);
   
     const handleKeyDown = (event) => {
       if (event.key === "Enter") {
           handleClick();
       }
     };

    const handleClick = () => {
        const text = document.querySelector('#noteinput').value.trim();
        if (text) {
            const nextState = produce(data, draftState => {
                draftState.push({ text })
            });
            document.querySelector('#noteinput').value = ''

            if (typeof window !== 'undefined') {
                localStorage.setItem('data', JSON.stringify(nextState))
            }

            setData(nextState);
        }
    };

     useEffect(() => {
       if (typeof window !== "undefined") {
         const getData = localStorage.getItem("data");
         if (getData !== "" && getData !== "null") {
           return setData(JSON.parse(getData));
         }
         return setData([]);
       }
     }, {data});



  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
      <Toolbar />
      <Notes data={data}></Notes>

      <TextField
        onKeyDown={handleKeyDown}
        id="noteinput"
        fullWidth
        size="small"
        placeholder='Try typing "paying utility bills"'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PanoramaFishEyeIcon />
            </InputAdornment>
          ),
        }}></TextField>
    </Box>
  );
}

export default MainLayout
