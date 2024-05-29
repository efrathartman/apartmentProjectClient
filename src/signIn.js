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
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchUsers, updateUser } from './users/userSlice';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Phone } from '@mui/icons-material';
import axios, { all } from "axios"
//import './signIn.css';

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
  email: Yup.string()
    .email('מייל לא חוקי')
    .required('שדה חובה'),
 
  password: Yup.string()
    .required('שדה חובה'),
});
// TODO remove, this demo shouldn't need to reset the theme.

//const defaultTheme = createTheme();

export default function SignIn({ setLoggedIn }) {
  const formik = useFormik({
    initialValues: { email: '', password: ''},
    validationSchema: SignupSchema,
  });
  let [full,setFull]=useState(false);
  let idUserLogin;
  let current_IdUserLogin;
  let [notExit,setNotExit] =useState(false);
  const[errorer,setErrorer]=useState(false);
  // let [exist,setExist]=useState(false)
  const users=useSelector(state=>state.users.users);
  const status=useSelector(state=>state.users.status);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); 
  const navigate = useNavigate();
  const dispatch=useDispatch();
  if(status!= 'fulfilled')
  {
      dispatch(fetchUsers())
      console.log(users);
  }

 
  const handleSubmit = async(event) => {
    const isValid = formik.isValid; // Check if form is valid

    if (isValid) {
      // Submit form logic here (e.g., dispatch action)
      console.log('Form submitted!');
    } else {
      console.log('Please fix errors in the form');
    }

    setIsButtonDisabled(!isValid); 
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    console.log(users);
    let email= data.get('email')
    let password= data.get('password')
    // const one = users&& users.find(x=>x.email===data.get('email'))
  //   let nameuser=one;
    
  //   if(one!=undefined)
  //     {
  //     if(one.password===data.get('password'))
  //     {
  //       localStorage.setItem("currentuser", one.id);
  //       localStorage.setItem("currentname", one.name);
  //       dispatch(updateUser(nameuser))
  //       setNotExit(false)
  //       navigate('/apartments')
  //        window.location.reload();
  //       setLoggedIn(true);
  //     }
  //     else
  //     {
  //       // alert("אחד הנתונים שגואים");
  //       setErrorer(true)
  //     }

  //     }
  //     else{
  //      setErrorer(true)
  //     }
  //   if(email===""||password==="")
  //   {
  //     setFull(true)
  //     setNotExit(false)
  //     console.log("efratushhhhhhhhh");
  //   }
  // };
 

  const userLogin = async (user) => {
    try {
      console.log("userLogin", user);
      const response = await axios.post('https://localhost:7248/api/User/lecture/Login', {
        Name: 'aaa',
        Email: user.em,
        Password: user.pa,
        Phone:"000"
      })
      idUserLogin = response.data
      console.log("idUserLogin", idUserLogin);
    } catch (error) {
      console.log("errorAddCategory", error);
      // return isRejectedWithValue(error)

    }
  }

  const userById = async (id) => {
    try {
      console.log('in userById');
      const response = await axios.get(`https://localhost:7248/api/User/${id}`)
      console.log(response.data);
      current_IdUserLogin = response.data
    } catch (error) {
      console.log("errorUserById", error);
    }

  }
  const user = { em: email, pa: password }
  await userLogin(user)
  console.log("current_IdUserLogin1", idUserLogin);
  if (idUserLogin !== 'worng') {
    // setUserNotExist(false)
    console.log("checkkkkkkkkkkit")
    await userById(idUserLogin)
    console.log("currentUserById", current_IdUserLogin);
    localStorage.setItem('currentuser', current_IdUserLogin.id)
    localStorage.setItem('currentname', current_IdUserLogin.name)
    // localStorage.setItem('idUser', current_IdUserLogin.id)

    dispatch(updateUser(current_IdUserLogin))
    setNotExit(false)
    navigate('/apartments')
    window.location.reload()
    setLoggedIn(true);
   }
   else{
    setNotExit(true)
   }
  }
  return (
   // <ThemeProvider theme={defaultTheme}>
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
            התחברות
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="תיבת מייל"
              name="email"
              autoComplete="email"
              autoFocus
              {...formik.getFieldProps('email')}
              error= {formik.touched.email && formik.errors.email}
              helperText= {formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמא"
              type="password"
              id="password"
              autoComplete="current-password"
              {...formik.getFieldProps('password')}
              error= {formik.touched.password && formik.errors.password}
              helperText= {formik.touched.password && formik.errors.password}
            />
              {errorer &&(<Alert severity="error" >אחד הנתונים שגויים</Alert>)}
           {formik.errors.password || formik.errors.email?(
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={true}
              sx={{ mt: 3, mb: 2 }}
            >
              התחברות
            </Button>):(
             <Button
           type="submit"
            fullWidth
            variant="contained"
            disabled={false}
           sx={{ mt: 3, mb: 2 }}
           >
          התחברות
           </Button>
            )}
            { notExit && (<Alert severity="error" >המשתמש לא קיים במערכת</Alert>)}
            {full &&(<Alert severity="error" >יש למלא את כל השדות</Alert>)}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    //</ThemeProvider>
  );
}