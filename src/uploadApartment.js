
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
import { addApartment } from './apartmemts/apartmentSlice';
import BasicModal from './error';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';

import * as Yup from 'yup';
import { useFormik } from 'formik';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 150,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'השדה חייב להכיל לפחות 2 תויים')
    .max(20, 'השדה חייב להכיל עד 10 תויים')
    .matches(/^[a-zA-Zא-ת]+$/, 'השדה חייב להכיל רק אותיות')
    .required("יש למלא שדה זה"),// כלל חדש
  
      price: Yup.string()
        .matches(/^[0-9]+$/, 'המספר יכול להכיל רק ספרות')
        .required("יש למלא שדה זה"),
        numofroom: Yup.string()
        .matches(/^[0-9]+$/, 'המספר יכול להכיל רק ספרות')
        .required("יש למלא שדה זה"),
        numofbed: Yup.string()
        .matches(/^[0-9]+$/, 'המספר יכול להכיל רק ספרות')
        .required("יש למלא שדה זה"),

    city: Yup.string()
    .min(2, 'השדה חייב להכיל לפחות 2 תויים')
    .max(20, 'השדה חייב להכיל עד 10 תויים')
    .matches(/^[a-zA-Zא-ת]+$/, 'השדה חייב להכיל רק אותיות')
    .required("יש למלא שדה זה"),// כלל חדש
    area: Yup.string()
    .min(2, 'השדה חייב להכיל לפחות 2 תויים')
    .max(20, 'השדה חייב להכיל עד 10 תויים')
    .matches(/^[a-zA-Zא-ת]+$/, 'השדה חייב להכיל רק אותיות')
    .required("יש למלא שדה זה"),// כלל חדש
    description: Yup.string()
    .min(2, 'השדה חייב להכיל לפחות 2 תויים')
    .max(20, 'השדה חייב להכיל עד 10 תויים')
    .matches(/^[a-zA-Zא-ת]+$/, 'השדה חייב להכיל רק אותיות')
    .required("יש למלא שדה זה"), // כלל חדש
  //  .min(2, 'השדה חייב רק ספרות')

    // .max(11, 'phone cannot exceed 20 characters')
});
const SUPPORTED_AUDIO_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'svg'];
export default function UploadApartment() {

 
  const formik = useFormik({
    initialValues: { name: '', numofroom: '',city: '',area: '',description: '',numofbed: '',price:''},
    validationSchema: SignupSchema,
  });
  const[able,setAble]=useState(true)
  const [typeFile, setTypeFile] = useState(false);
  const [ok, setOk] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [opener, setOpener] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); 
  const dispatch = useDispatch();
  let [id, setId] = useState('');
  let [name, setName] = useState('');
  let [numOfRooms, setNumOfRooms] = useState('');
  let [numOfBeds, setNumOfBeds] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState('');
  let [area, setArea] = useState('');
  let [city, setCity] = useState('');
  let [category, setCategory] = useState('');
  let [allApartments, setallApartments] = useState(undefined)
  let [selectedFile, setSelectedFile] = useState([]);
  let isValidImage = true;

 
  function isImage  (file) {
    const acceptedImageTypes = ["image/jpeg","image/jpg","image/png","image/gif","image/bmp"];

    if(acceptedImageTypes.includes(file.type))
    {
      console.log("ok");
      return true
    }
    else{
      console.log("no");
      console.log(selectedFile,"sel");
      isValidImage=false;
      return
    }
    
  };

  const handleSubmit = async (event) => {
    console.log(selectedFile,"ihgu");
    for (let index = 0; index < selectedFile.length; index++) {
      if(isImage(selectedFile[index])==false)
      {
       console.log("nbnb");
        setAble(false);
      }   
  }
  if(!isValidImage)
  {
    alert("יש להזין קובץ מסוג תמונה בלבד")
  }
  else{

  
    if (name == ''|| numOfBeds == '' || numOfRooms == '' || description == '' || price == '' || area == '' || city == '' || category == '' || selectedFile == null) {
      // alert("יש למלא את כל הפרטים");
      console.log("adir",name,numOfBeds,numOfRooms,description,price,area,city,category,selectedFile);
      alert("יש למלא את כל השדות")
    }
    else {
      // setCategory("1")
      setOk(true)
      setTimeout(() => setOk(false), 3000);
      console.log(category, "category");
      if (category == "צימר") {
        setCategory(8);
      }
      else {
        setCategory(9);
      }

      console.log(category, "cat");
      console.log(name + "ttttttttt")
      event.preventDefault(); // מנע התנהגות ברירת מחדל של שליחת טופס
      const isValid = formik.isValid; // Check if form is valid

      if (isValid) {
        // Submit form logic here (e.g., dispatch action)
        console.log('Form submitted!');
      } else {
        console.log('Please fix errors in the form');
      }
      setIsButtonDisabled(!isValid); 
      console.log("jhh");
      console.log(selectedFile,"ses");
      // const data = new FormData(event.currentTarget);
      setallApartments(
        {
          id1: current,
          name1: name,
          numOfBeds1: numOfBeds,
          numOfRooms1: numOfRooms,
          description1: description,
          price1: price,
          area1: area,
          city1: city,
          category1: category == "צימר" ? 8 : category=="וילה"? 9:10,
          selectedFile1: selectedFile,
          responseOfUsers1: []

        }
      )
   }
  }
  }
  useEffect(() => {
    console.log(allApartments, "rrrrrrrrrr");
    if (allApartments != undefined) {
      console.log("itemmm");
      console.log(allApartments,"alp");
      dispatch(addApartment(allApartments))
    }
  }, [allApartments])
  // console.log(id,name,numOfRooms);

  console.log(useSelector(state => state.users));
  // const current = useSelector(state => state.users.nameLogin)
  const [current, setCurrent] = useState(localStorage.getItem('currentuser') || null);
  localStorage.getItem("currentuser",current);
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

    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ marginTop: "80px", border: " 1px solid olive" }}>
        <Typography component="h1" variant="h4" align="center" >
          העלאת דירה
        </Typography>
        <React.Fragment>
          <Typography variant="h6" gutterBottom >
            פרטי הדירה
          </Typography>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Id"
                name="Id"
                label="Id"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                // defaultValue={current.id}
                //  value={current.id}
                value={id}
                // disabled="false"
                onChange={(e) => setId(e.target.value)}

              />

            </Grid> */}
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
                value={city}
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
                value={area}
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
                value={numOfRooms}
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
                value={numOfBeds}
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
                value={price}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="קטגוריה"
              name='Category'
              sx={{width:"30%",height:"50px",marginTop:"25px",}}
              onChange={(e) => setCategory(e.target.value)}
          
            >
              <MenuItem value={'וילה'} sx={{direction:"rtl"}}>וילה</MenuItem>
              <MenuItem value={'צימר'} sx={{direction:"rtl"}}>צימר</MenuItem>
              <MenuItem value={'קמפוס' } sx={{direction:"rtl"}}>קמפוס</MenuItem>
            </Select>
            {selectedFile.map((file, index) => (
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
              העלאת תמונות
              <VisuallyHiddenInput type="file"
                onChange={(e) =>  setSelectedFile([e.target.files[0], ...selectedFile])} />
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1,height:"50px",marginTop:"35px" ,marginRight:"10px"}}
              onClick={handleSubmit}
            >
              אישור
            </Button>
            </div>
          {opener &&  <Alert sx={{marginRight:"12pc"}} severity="error" >יש להזין קובץ מסוג תמונה בלבד</Alert>}
         {ok && (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           הדירה נוספה בהצלחה
          </Typography>
        </Box>
      </Modal>)}
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  );
}