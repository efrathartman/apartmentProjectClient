import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/navbar';
import { Route, Routes } from 'react-router-dom';
import SignIn from './signIn';
import SignUp from './signUp';
import AllCategories from './categories/allCategories';
import AllUsers from './users/allUsers';
import MediaCard from './apartmemts/allApartments';
import AllApartments from './apartmemts/allApartments';
import  Details  from './details'
import UploadApartment from './uploadApartment';
import MainImage from './mainImage';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useState } from 'react';
// import { Tabs } from '@mui/material';
import FloatingActionButtonZoom from './privateArea';
import BasicModal from './error';
import DeleteApartment from './deleteApartment';
import UpdateApartment from './updateApartment';
import About from './about';





function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* <MediaCard/> */}
     <ResponsiveAppBar isLoggedIn={isLoggedIn}/>
   
     <Routes> 
    <Route path='signIn' element={<SignIn setLoggedIn={setLoggedIn}/>}/>
     <Route path='signUp' element={<SignUp/>}/>
     <Route path='about' element={<About/>}/>
     <Route path='categories' element={<AllCategories/>}/>
     <Route path='users' element={<AllUsers/>}/>
     <Route path='' element={<MainImage/>}/>
     <Route path='apartments' element={<AllApartments/>}/>
     <Route path='details/:id' element={<Details setLoggedIn={setLoggedIn}/>}/>
     <Route path='tabs/details/:id' element={<Details setLoggedIn={setLoggedIn}/>}/>
     <Route path='upload' element={<UploadApartment/>}/>
     <Route path='typeOfApartment/:id' element={<AllApartments/>}/>
     <Route path='typeOfApartment/:id/details/:id' element={<Details setLoggedIn={setLoggedIn}/>}/>
     <Route path='mainImage' element={<MainImage/>}/>
     <Route path='apartments/details/:id' element={<Details setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}/>
     <Route path='tabs' element={<FloatingActionButtonZoom/>}/>
     <Route path='tabs/deleter/:id' element={<DeleteApartment/>}/>
      <Route path='tabs/updater/:id' element={<UpdateApartment />}/>
      <Route path='localhost:3000/apartments#app-bar-with-responsive-menu' element={<MainImage/>}></Route>
     </Routes>
     
    </div>
  );
}

export default App;
