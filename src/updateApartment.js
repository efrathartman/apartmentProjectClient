
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Alert, Input, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { date } from 'yup';
import { useEffect } from 'react';
import { addApartment, fetchApartments, updateApartment } from './apartmemts/apartmentSlice';
import BasicModal from './error';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function UpdateApartment() {
 
    let {id}=useParams();
    console.log(id,"halan");
    const apartmemts=useSelector(state=>state.apartmemts.apartmemts);
    const status=useSelector(state=>state.apartmemts.status);
    const dispatcher=useDispatch();
    useEffect(()=>{
        console.log('in useeffect');
        if(status!= 'fulfilled')
        console.log("here");
         dispatcher(fetchApartments())
         console.log("end");
         console.log(apartmemts);
    },[])
    console.log(apartmemts,"apartments");
    const one= apartmemts.find(x=>x.id==id)
    console.log(one,"pa");
    console.log(one.pictureFile,"papa");
    console.log(one.category,"cujjjjj");
    
    console.log(one.numOfBeds,"lplp");
    const[kind,setKind]=useState('')
    if(one.category==8)
    {
        setKind("וילה")
    }
    else{
            if(one.category==9)
            {
                // setKind("צימר")
            }
            else{
                // setKind("קמפוס")
            }
        }    
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [opening,setOpening]=useState(false);
  const dispatch = useDispatch();
//   let [id, setId] = useState('');

  let [name, setName] = useState(one.name);
  let [numOfRooms, setNumOfRooms] = useState(one.numOfRooms);
  let [numOfBeds, setNumOfBeds] = useState(one.numOfBeds);
  let [description, setDescription] = useState(one.description);
  let [price, setPrice] = useState(one.price);
  let [area, setArea] = useState(one.area);
  let [city, setCity] = useState(one.city);
  let [category, setCategory] = useState(one.category);
  let [allApartments, setallApartments] = useState(undefined)
  let [selectedFile, setSelectedFile] = useState(one.pictureFile);
  // setSelectedFile(one.pictureFile)
  console.log('file' ,selectedFile);
  const [currenter, setCurrenter] = useState(localStorage.getItem('currentuser') || null);
    localStorage.getItem("currentuser",currenter);
  const handleSubmit = async (event) => {
   console.log(selectedFile,"ihgu");
    // setSelectedFile([e.target.files[0], ...selectedFile])
    setOpening(true)

     {
      console.log(selectedFile,"tktk");
      console.log(category, "cat");
      console.log(name + "ttttttttt")
      console.log("jhh");
      // const data = new FormData(event.currentTarget);
      setallApartments(
        {
          id1: currenter,
          name1: name,
          numOfBeds1: numOfBeds,
          numOfRooms1: numOfRooms,
          description1: description,
          price1: price,
          area1: area,
          city1: city,
          category1: 8,
          selectedFile1: selectedFile,
          responseOfUsers1: []

        }
      )

    }
    
  }
  useEffect(() => {
    console.log(allApartments, "rrrrrrrrrr");
    if (allApartments != undefined) {
      console.log(allApartments,"gfgf");
      console.log("itemmm");
      allApartments?.selectedFile1 &&  dispatch(updateApartment(id,allApartments))
    }
  }, [allApartments])
  console.log(id,name,numOfRooms);

  console.log(useSelector(state => state.users));
  const current = useSelector(state => state.users.nameLogin)
  console.log(current);
  const [value, setValue] = useState(0);

  const increaseValue = () => {
    setValue(value + 1);
  };

  const decreaseValue = () => {
    setValue(value - 1);
  };

  const top100Films = [
    { label: 'וילה', value: 1 },
    { label: 'צימר', value: 2 },
  ];
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,

  });

  return (
<div>
  {one && (

    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ marginTop: "80px", border: " 1px solid olive" }}>
        <Typography component="h1" variant="h4" align="center" >
          עדכון דירה
        </Typography>
        <React.Fragment>
          <Typography variant="h6" gutterBottom >
            פרטי הדירה
          </Typography>
          <Grid container spacing={3}>
         
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Name"
                name="Name"
                label="שם"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                // defaultValue={current.name}
                defaultValue={one.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="City"
                name="City"
                label="עיר"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                defaultValue={one.city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Area"
                name="Area"
                label="איזור"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                defaultValue={one.area}
                onChange={(e) => setArea(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="NumOfRooms"
                name="NumOfRooms"
                label="מספר חדרים"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                defaultValue={one.numOfRooms}
                onChange={(e) => setNumOfRooms(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="NumOfBeds"
                name="NumOfBeds"
                label="מספר מיטות"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                defaultValue={one.numOfBeds}
                onChange={(e) => setNumOfBeds(e.target.value)}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Price"
                name="Price"
                label="מחיר"
                fullWidth
                variant="standard"
                defaultValue={one.price}

                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Description"
                name="Description"
                label="תאור"
                fullWidth
                multiline
                autoComplete="shipping postal-code"
                variant="standard"
                defaultValue={one.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
             value={category}
              label="קטגוריה"
              name='Category'
              sx={{width:"30%",height:"50px",marginTop:"25px"}}
              defaultValue={one.category}
             
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={'וילה'} sx={{direction:"rtl"}}>וילה</MenuItem>
              <MenuItem value={'צימר'} sx={{direction:"rtl"}}>צימר</MenuItem>
              <MenuItem value={'קמפוס'} sx={{direction:"rtl"}}>קמפוס</MenuItem>
            </Select>

            {selectedFile?.map((file, index) => (
              <Typography key={index} variant="h6" gutterBottom sx={{ fontSize: 5, mr: 1 }}>
         {file.name}
         <br/>
       </Typography>
        ))}
            {console.log(category + "miki")}
<div>
            <Button sx={{ height: "50px", marginTop: "35px", marginRight: "205px" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              העלת תמונות
              <VisuallyHiddenInput type="file"
                onChange={(e) =>  setSelectedFile([e.target.files[0], ...selectedFile])} />
            </Button>
         

            {/* <Button sx={{ height: "50px", marginTop: "35px", marginRight: "205px" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              העלת תמונות
              <VisuallyHiddenInput type="directory" multiple
                onChange={(e) => {const files = e.target.files;
                  // הצגת שמות הקבצים
                  for (const file of files) {
                    console.log(file.name);
                  }
                  // ...
                  // קוד נוסף לטיפול בקבצים
                  // ...
                  setSelectedFile(files);
                }} />
            </Button>
            <Typography variant="h6" gutterBottom sx={{ fontSize: 5, mr: 1 }}>
              {selectedFile && selectedFile.name}
            </Typography> */}
         {/* <Button variant="contained" 
              component="span" 
              onClick={handleClick} 
              startIcon={<CloudUploadIcon />}>
        הוסף תמונות
      </Button> */}
      {/* {selectedFile.map((image) => (
        <img key={image} src={image} alt="" />
      ))} */}


            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 ,height:"50px",marginTop:"35px" ,marginRight:"10px"}}
             
              onClick={()=> handleSubmit()}

            >
              אישור
            </Button>
            </div>
          {opening &&  (<Alert sx={{marginRight:"19pc",marginTop:"10px"}} severity="success">העדכון התבצע בהצלחה</Alert>)}
            {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>)}
    </div>
  );
}