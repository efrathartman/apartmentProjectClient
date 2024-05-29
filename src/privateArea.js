import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Alert, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApartments, removeApartment } from './apartmemts/apartmentSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link, useNavigate, useParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertDialog from './deleteApartment';
import UpdateApartment from './updateApartment';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 150,
  bgcolor: 'background.paper',
  border: '2px solid Olive',
  boxShadow: 24,
  p: 4,
  marginTop:"1px",
};

const FloatingActionButtonZoom=()=>{
  const [current, setCurrent] = useState(localStorage.getItem('currentuser') || null);

localStorage.getItem("currentuser",current);
console.log(current,"mimi");
  // const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
   const [visible,setVisible]=useState(false)
   const navigate=useNavigate( );
  const handleClickOpen = (id) => {
    setOpen(true);
    setTimeout(() => handleClose(), 3000);
    dispatch(removeApartment(id))
    // window.location.reload()
   
    
  //  setOpen(true)
  };
  const handleCloses = () => {
    
    setOpen(false);
  };
  function handleClose() {
    setOpen(false);
    window.location.reload()
  } 

    const[myapartments,setMyapartments]=useState(false);
    const[mydetails,setMydetails]=useState(false);
    const dispatch=useDispatch();
    const apartmemts=useSelector(state=>state.apartmemts.apartmemts);
    // const current=useSelector(state=>state.users.nameLogin)
    const personal=()=>{
        setMyapartments(false)
        setMydetails(true)
        console.log(current.id,"cur");
        
    }
    const myApartment=()=>{
        console.log("jhg");
        dispatch(fetchApartments());
        setMydetails(false)
        setMyapartments(true)

    }
    const opening=()=>{
      setVisible(true)
    
    }
    return (
  <div style={{display:"flex"}}> 
  <div style={{marginTop: "100px", flex: "1 1 20%", display: "flex", flexDirection: "column", width: "200px"}}>

  <br/>
  <Button onClick={myApartment}>דירות שבבעלותי</Button>
 
</div> 
 <div style={{marginTop: "0px", flex: "1 1 80%" ,textAlign:"center"}} >
 <ul style={{display: "grid",gridTemplateColumns: "repeat(3, 1fr)",gridGap: "10px",gridTop:"90px"}}>
 {myapartments&& apartmemts && apartmemts.filter((category) =>category.userId == current).map((category,index)=>{
        
        return(
        
            <Card sx={{ maxWidth: 345,border:"2px solid olive"   }}>
                 <CardMedia
                    sx={{ height: 225 }}
                    image={category.pictureFile[0]}
                    title="apartment"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
                     {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">Share</Button> */}
                    <Link to={'details/'+category.id}> 
                    <Button  size="small" style={{fontSize:"medium",border:"1px solid olive"}}>עוד</Button>

                    </Link>
                    
                    {/* <Button onClick={ () => setIsOpen(true)} size="small" style={{fontSize:"large"}}>הסרה</Button> 
                    {isOpen && <AlertDialog />} */}
   
   <Button  sx={{margin:"5%",border:"1px solid olive"}} onClick={()=> handleClickOpen(category.id)}>
        הסרה
      </Button>
      {open && (<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
   
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    הדירה הוסרה בהצלחה
    </Typography>
  </Box>
</Modal>

)}
{/*       
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{backgroundColor:"white"}}
        // PaperProps={{
        //   style: {
        //     backgroundColor: 'transparent',
        //     boxShadow: 'none',
        //     position: 'absolute',
        //     zIndex: 9999, // Ensure Dialog appears on top
        //   },
        // }}
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"?האם ברצונך למחוק דירה זו לצמיתיות"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=>handleCloses()}>ביטול</Button>
          
          <Button onClick={()=>handleClose(category.id)} autoFocus>
            אישור
          </Button>
        </DialogActions>
      </Dialog> */}
                   <Link to={'updater/'+category.id}> 
                  <Button onClick={ ()=> {
                    {console.log(";l;l")}
                  
                    // <Link to={'details/'+category.id}> 
                  }
                  }  size="small" style={{fontSize:"medium",border:"1px solid olive",marginRight:"2%"}}>עדכון</Button>  </Link>
                  {/* {visible && <UpdateApartment oneapartment={category}/>} */}
                  {/* {visible && <UpdateApartment />} */}
                  </CardActions>
                </Card>
              
        )
    })}
    </ul>
    {/* dispatch(removeApartment(category.id) */}
    {/* {mydetails
    // <Button onClick={deleteApartment(201)} size="small" style={{fontSize:"large"}}>הסרה</Button>
    } */}
 </div>
 
 
 </div>
 
);

}
export default FloatingActionButtonZoom