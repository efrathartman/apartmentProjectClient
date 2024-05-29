
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import SendIcon from '@mui/icons-material/Send';
import apartmentSlice, { addResponse, fetchApartments } from "./apartmemts/apartmentSlice";
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PlaceIcon from '@mui/icons-material/Place';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import { keyframes } from "@emotion/react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import * as React from 'react';
import Box from '@mui/material/Box';
import { number } from "yup";
import { useState } from "react";
import { current } from "@reduxjs/toolkit";
import ImageSlider from "./imageSlider";
import PaymentIcon from '@mui/icons-material/Payment';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ModeIcon from '@mui/icons-material/Mode';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import { TextField } from "@mui/material";
import './details.css'
import ResponseSlides from "./responseSlides";

const Blog=({ isLoggedIn ,setLoggedIn})=>{

 console.log(isLoggedIn,"is");
  const[text,setText]=useState('')
  // const[res,setRes]=useState(false)
  const[visible,setVisible]=useState(false)
   const [currenter, setCurrenter] = useState(localStorage.getItem('currentuser') || null);
//     let current;
const [statuser, setStatuser] = useState('idle');
  localStorage.getItem("currentuser",currenter);
  console.log(currenter,"juju");
  async function send()
  {
    console.log("hi");
    console.log(text);
    setLoggedIn(false)
    setVisible(false);
     await  dispatch(addResponse(currenter,one.id,text))
    
  }
  function visibliting(){
    setVisible(true)

  }
  function unvisibliting(){
    setVisible(false)

  }
    let {id}=useParams();
    const current=useSelector(state=>state.users.nameLogin)
   
    const idofuser=current.id
    const users=useSelector(state=>state.users.users);
   
    // let nameuser=users&& users.find(x=>x.userId===x.responseOfUsers.userId)
    const apartmemts=useSelector(state=>state.apartmemts.apartmemts);
    const status=useSelector(state=>state.apartmemts.status);
    const dispatch=useDispatch();
    useEffect(()=>{
        console.log('in useeffect');
        if(status!= 'fulfilled')
        console.log("here");
         dispatch(fetchApartments())
         console.log("end");
         console.log(apartmemts);
        
        // const funcCategory = async () => {
        //   console.log("bbb");
        //   await dispatch(fetchApartments())
        // }
        // funcCategory();
    
    },[])
    console.log(apartmemts,"apartments");
    const one= apartmemts.find(x=>x.id==id)
    console.log(one,"oner");
    // console.log(one.pictureFile.length);
    
    let itemData=[];
    for (let index = 0; index < one?.pictureFile.length; index++) {
      itemData?.push({img: one?.pictureFile[index]})
        
    }
    // console.log(one.responseOfUsers,"response"); 
    // console.log(one.user.name);  
    
    return(  
      <div >
       {one && (
        <div>
         <div style={{display:"flex",marginTop:"80px",flexDirection:"row" }}>
         <div style={{width:"500px",height:"380px",marginRight:"70px"}} >
            <ImageSlider slides={itemData}/>
            </div>
            {/* <div style={{marginTop:"10px",marginRight:"100px",display:"flex",flexDirection:"row"}}> */}
             <div style={{marginRight:"5%"}} >
             <Typography variant="subtitle1" fontFamily={"unset"} paragraph sx={{ display: 'flex' }}>
         <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.name}</p> 
         <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.user.name}</p> 
         </Typography>
          {/* <Typography variant="subtitle1" fontFamily={"unset"} paragraph sx={{ display: 'flex' }}>
         <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.user.name}</p> 
         </Typography> */}
         <Typography variant="subtitle1"  ml={1} sx={{ display: 'flex' }}>
                 <PhoneIcon/>
                 <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.user.phone}</p> 
               </Typography>
               <Typography variant="subtitle1"  ml={1} sx={{ display: 'flex' }}>
                 <PlaceIcon/>
                 <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.city}</p> 
               </Typography>
               <Typography variant="subtitle1" paragraph sx={{ display: 'flex' }}>
                <LocationCityIcon/>
                <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.area}</p> 
               </Typography>
             <Typography variant="subtitle1" paragraph sx={{ display: 'flex' }}>
              <MeetingRoomIcon/>
              <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.numOfRooms}</p> 
               </Typography>
               <Typography variant="subtitle1"  paragraph sx={{ display: 'flex' }}>
                 {/* <div style={{ display: "flex", marginLeft: "20px" }}> */}
                 <BedroomChildIcon />
                <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.numOfBeds}</p> 
                {/* </div>  */}
   </Typography>    
      <Typography variant="subtitle1" paragraph sx={{ display: 'flex' }}>
        <PaymentIcon/>
        <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.price}</p> 
       </Typography>
            
         <Typography variant="subtitle1" fontFamily={"unset"} paragraph sx={{ display: 'flex' }}>
        <div>כמה מילים:</div>
         <p style={{ marginLeft: "20px",marginRight:"20px",marginTop:"0px"}}>{one.description}</p> 
         </Typography>
         </div>
         </div>
        <div style={{display:"flex",flexDirection:"row"}}>
       <div style={{    width: "74%"}}>
         <h3 style={{marginRight:"5%",color:"olive"}}>המלצות</h3>
         <ResponseSlides slides={one.responseOfUsers}/>
       
        </div>
       <div style={{marginTop:"4%"}}>
{/* <div style={{marginTop:"100px",marginRight:"100px" }}> */}
{currenter &&  <Button onClick={() => setVisible(true)}  className="button-vibrate" variant="contained">הוסף תגובה</Button>}
        {visible && (
      <form class="modal-content animate">
        <div class="imgcontainer">
          <button onClick={() => setVisible(false)}>&times;</button>
        </div>
        <TextField
          id="comment-field"
          label="הוספת תגובה"
          multiline
          rows={4}
          variant="filled"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* <SendIcon
          sx={{
            transform: "rotate(180deg)",
            marginTop: "100px",
            marginRight: "10px",
          }}
        /> */}
       <Button variant="contained" sx={{
           visibility: "hidden",
          transform: "rotate(180deg)",
         marginTop: "100px",
     marginRight: "-15px",
    
    }} onClick={send}>
    <SendIcon sx={{visibility: "visible",color:"olive",margin:"0px"}} />
   </Button>
      </form>
    )}
          </div> 
          </div>
      </div> )}
        {/* <div style={{display:"flex",flexDirection:"column"}}></div> */}
     
          </div>
     )
    }
    export default Blog;