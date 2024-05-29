
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from './categories/categorySlice';
import { addUser, fetchUsers } from './users/userSlice';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { InputLabel } from '@mui/material';



//import './signUp.css';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'השדה חייב להכיל לפחות 2 תויים')
    .max(20, 'השדה חייב להכיל עד 10 תויים')
    .matches(
      /^[a-zA-Zא-ת_\s]+$/,
      'השדב חייב להכיל רק אותיות'
    )
    .required('שדה חובה'),

  email: Yup.string()
    .email('מייל לא חוקי')
    .required('שדה חובה'),
  //  phone: Yup.number()
  //  .min(10, 'הפלאפון חייב להכיל 10 ספרות')
  //   // .max(11, 'phone cannot exceed 20 characters')
  //   .required('שדה חובה'),
 
    phone: Yup.string()
    .min(10, 'הפלאפון חייב להכיל 10 ספרות')
        .matches(/^[0-9]+$/, 'המספר יכול להכיל רק ספרות'),
  password: Yup.string()
    .required('שדה חובה'),
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
function SignUp() {
  const formik = useFormik({
    initialValues: { username: '', email: '', password: '' ,phone:''},
    validationSchema: SignupSchema,
    // onSubmit: (values) => {
    //   // For the demonstration purposes, we're console logging the values provided by user.
    //   console.log('Submitted values:', values);
    // },
  });
  let [alredyExit,setAlredyExit] =useState(false) ;
  const users=useSelector(state=>state.users.users);
  const status=useSelector(state=>state.users.status);
  const [open,setOpen]=useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); 
 
  const dispatch=useDispatch();
  if(status!= 'fulfilled')
  {
      dispatch(fetchUsers())
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = formik.isValid; // Check if form is valid

    if (isValid) {
      // Submit form logic here (e.g., dispatch action)
      console.log('Form submitted!');
    } else {
      console.log('Please fix errors in the form');
    }

    setIsButtonDisabled(!isValid); 
   
    const data = new FormData(event.currentTarget);
   let email= data.get('email')
   let password= data.get('password')
     let name=data.get('name')
     let phone=data.get('phone')
   
     console.log(phone,name,email,password);
    console.log({
      email: data.get('email'),
      password: data.get('password'),

    });
    console.log(password,"p");
    // dispatch(addUser(name,email,password,phone))
   const one=users.find(x=>x.email===data.get('email'))
   console.log(one,"one");
   if(one ===undefined)
   {
    setOpen(true);
    setAlredyExit(false)
    dispatch(addUser(name,email,password,phone))
   }
   else{
    setAlredyExit(true)
    setOpen(false)
   }
  //  users&& users.map((c)=>{
  //   console.log(c.password,"ps");

  //     if(c.password===data.get('password'))
  //       {
  //         console.log("false, exist");
  //         setAlredyExit(true)
          
  //         return;
  //       }
  //       else{
  //         setOpen(true)
  //         console.log("true");
         
            
  //       }
  //       dispatch(addUser(name,email,password,phone))
  //   })
   
   };

  return (
    //<ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          הרשמה
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="שם"
                  autoFocus
                  {...formik.getFieldProps('name')}   
                  error={formik.touched.name && formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              {/* {formik.touched.username && formik.errors.username && (
           <div className='error' style={{fontSize:"small"}}>{formik.errors.username}</div>
  )} */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="טלפון"
                  name="phone"
                  autoComplete="family-name"
                  {...formik.getFieldProps('phone')}
                 error={formik.touched.phone && formik.errors.phone}
                 helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              {/* {formik.touched.phone && formik.errors.phone && (
              <div className='error' style={{fontSize:"small"}}>{formik.errors.phone}</div>
           )} */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="תיבת מייל"
                  name="email"
                  autoComplete="email"
                  {...formik.getFieldProps('email')}
                  error= {formik.touched.email && formik.errors.email}
                  helperText= {formik.touched.email && formik.errors.email}
                />
                 {/* {formik.touched.email && formik.errors.email && (
           <div className='error' style={{fontSize:"small"}}>{formik.errors.email}</div>
  )} */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              {/* {formik.touched.password && formik.errors.password && (
           <div className='error' style={{fontSize:"small"}}>{formik.errors.password}</div>
  )} */}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            {/* <form onSubmit={formik.handleSubmit}> */}
            {/* {formik.errors.password || formik.errors.email ||formik.errors.name||formik.errors.phone} && ( */}
            {formik.errors.password || formik.errors.email ||formik.errors.name||formik.errors.phone?  (
                  <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={true}
                  sx={{ mt: 3, mb: 2 }} 
                >
                  הרשמה
                </Button>):  ( <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={false}
                  sx={{ mt: 3, mb: 2 }} 
                >
                  הרשמה
                </Button>)} 
            
                { open && (<Alert severity="success" >המשתמש נוסף בהצלחה למערכת</Alert>)}
          
            {/* </form> */}
       
           {/* {alredyExit===true && */}
         { alredyExit && (<Alert severity="error" >המשתמש כבר קיים במערכת</Alert>)}

            {/* {alredyExit && */}

            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
   // </ThemeProvider>
  );
}
export default SignUp;