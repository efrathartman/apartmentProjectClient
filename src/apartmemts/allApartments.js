
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchApartments } from './apartmentSlice';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './apartment.css'
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useRef } from "react";
// import { makeStyles } from '@mui/styles';
// const useStyles = makeStyles((theme) => ({
//   card: {
//     maxWidth: 345,
//     border: "2px solid olive",
//     [theme.breakpoints.down('sm')]: {
//       maxWidth: 200,
//     },
//   },
// }));


const AllApartments=()=>{
  
    let {id}=useParams();
  console.log(id,"iddddddddd");
    const apartmemts=useSelector(state=>state.apartmemts.apartmemts);
    const status=useSelector(state=>state.apartmemts.status);
    const dispatch=useDispatch();
    
    const many= apartmemts.filter(x=>x.categoryId==id)
    console.log(many,"many");
    // if(many!=undefined)
    // {
    //   //  apartmemts=apartmemts.map(x=>x.categoryId==id)
    // }
    useEffect(() => {
      const func = async () => {
        await dispatch(fetchApartments());
        console.log(apartmemts,"piiiiiiip");
      }
      func();
    }, [])
  
    // apartmemts && apartmemts.map((category)=>{
    //   console.log(category.id,"ppppppp")
    //  })
    return(
//       <div >
//       <Box sx={{ width: 300 ,marginTop:"97px",marginRight:"1200px",marginBottom:"0px"}}>
//       <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" sx={{color:"olive"}}  min={500}
//  max={5000}/>
//     </Box>
        <ul className="ulapartment">
       
        {status=='idle' && <p>לא נשלפו עדיין קטגוריות</p>}
        {status=='pending'&& <p>המחיקה מתבצעת</p>}
        {/* .filter((category) => category.categoryId == id) */}
        {id && apartmemts && apartmemts.filter((category) => category.categoryId == id).map((category,index)=>{
        
            return(
             
                <Card sx={{ maxWidth: 345,border:"2px solid olive" }}>
                

                     <CardMedia
                        sx={{ height: 225}}
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
                        <Button size="small" style={{fontSize:"large",border:"1px solid olive"}}>עוד</Button>
                        </Link>
                      </CardActions>
                     
                    </Card>
                  
            )
        })}
         {!id && apartmemts && apartmemts.map((category,index)=>{
        
        return(
         
            <Card sx={{ maxWidth: 345,border:"2px solid olive"   }}>
                 <CardMedia
                    sx={{ height: 225}}
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
                    <Button size="small" style={{fontSize:"large"}}>עוד</Button>
                    </Link>
                  </CardActions>
                </Card>
              
        )
    })}
 
    </ul>
  
    )
 
}
export default AllApartments


