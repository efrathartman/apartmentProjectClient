import { Description } from "@mui/icons-material"
import { create } from "@mui/material/styles/createTransitions"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios, { all } from "axios"
import { useState } from "react"
import AllApartments from "./allApartments"

const initialState={
    apartmemts:[],
    status:'idle'
}
let arr=[];
let imgaer;
export const fetchApartments=createAsyncThunk(
   
    'apartments/fetchApartments',
    async(thunkAPI)=>{
     console.log("in here");
      const response=await axios.get('https://localhost:7248/api/Apartment') 
      let d=response.data 
    //   console.log(d);
    //   console.log(response.data[0].responseOfUsers,"efart");
     
      for(let index=0;index<d.length;index++)
      {
        if(d[index].id==230)
        {
            console.log("yyyyes");
            console.log(d[index].urlImages);
        }
         console.log(d[index].responseOfUsers,"rrrrrrrrrrrrrr");
        const img=d[index].urlImages
        console.log(img);
        // console.log("llll");
        if(img !='undefined')
        {
            console.log("tttttttt");
            let arr=[];
            console.log(index);
            for (let i = 0; i <= d[index].urlImages.length-1; i++) {
                console.log("uuuuuu")
            let imgaer=img[i]
               console.log(imgaer);
               const picture=await axios.get(`https://localhost:7248/api/Apartment/GetImage/${imgaer}`)
             
               console.log('picture: ',picture);
               arr.push(picture.data)
               console.log(arr.length+"length");
            }

             d[index]={...d[index],pictureFile:arr}

        }   
        // console.log(response.data,"llllllll");
        // d[index]={...d[index],pictureFile:arr}
      }
   
   
      return response.data;
    },
   
)
// export const addResponse=(ida,idu,txt)=>
// console.log("respone i am");
//     async(thunkAPI)=>{
        
//         try {
//             const response=await axios.post('https://localhost:7248/api/Response',
//             {
//                 Ida:ida,
//                 Idu:idu,
//                 Text:txt,
    
//             })
//             return response.data
//         } catch (error) {
//             console.log(error);
//         }
//     }
export const addResponse=(idu,ida,txt)=>
     
    async(thunkAPI)=>{
        console.log("add");
        
        console.log(txt,"txt",idu,ida);
        try{
            console.log(txt,"txt",idu,ida);
        const response=await axios.post('https://localhost:7248/api/Response' ,   
        {
            UserId:idu,
            ApartmentId:ida,
            Description:txt

        })
        return response.data
    }catch(error)
    {
        console.log(error)
    }
}
export const addApartment = createAsyncThunk( 
    'apartments/addApartment',
   
    async (allApartments) => {

        console.log("addapartments", allApartments);
        try {
            console.log("here")
            const formData = new FormData()
            // formData.append('Id', allApartments.id1)
            formData.append('UserId', allApartments.id1)
            // formData.append('UserId',2)
            // formData.append('Name',allApartments.name1)
            formData.append('Name', allApartments.name1)
            formData.append('City', allApartments.city1)
            formData.append('Area', allApartments.area1)
            formData.append('NumOfRooms', allApartments.numOfRooms1)
            // formData.append('NumOfRooms', 5)
            formData.append('NumOfBeds', allApartments.numOfBeds1)
            // formData.append('NumOfBeds', 89)

            formData.append('Price', allApartments.price1)
            formData.append('CategoryId', allApartments.category1)
            // formData.append('CategoryId',8)

            formData.append('Description',allApartments.description1)
        

            //  formData.append('FilelImages',allApartments.selectedFile1)
            //     console.log(allApartments.selectedFile1,"popop");
            
            for (const file of allApartments.selectedFile1) {
                formData.append('FilelImages', file);
              }
            
            // formData.append('FilelImages',...allApartments.selectedFile1)
            formData.append('ResponseOfUsers',allApartments.responseOfUsers1)
            // if (Array.isArray(allApartments.selectedFile1)) {
            //     for (const file of allApartments.selectedFile1) {
            //       formData.append('FilelImages', file);
            //     }
            //   } else {
            //     // Handle single file or non-file scenario (optional)
            //     formData.append('FilelImages', allApartments.selectedFile1); // Assuming it's a single file
            //   }
           console.log(formData,"sh");
            const response = await axios.post("https://localhost:7248/api/Apartment",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;
        }
        catch (error) {
            console.log(error);
            // return isRejectedWithValue(error)
        }
        // return {}
    }
)

export const updateApartment = (id,allApartments) =>
  
   
    async (thunkAPI) => {

        console.log("updateapartments", allApartments);
        console.log(allApartments.selectedFile1,"ppp");
        try {
            console.log("here")
            const formData = new FormData()
            // formData.append('Id', allApartments.id1)
            formData.append('UserId', allApartments.id1)
            formData.append('Name', allApartments.name1)
            // formData.append('UserId',2)
            // formData.append('Name',allApartments.name1)
        
            formData.append('City', allApartments.city1)
            formData.append('Area', allApartments.area1)
            formData.append('NumOfRooms', allApartments.numOfRooms1)
            // formData.append('NumOfRooms', 5)
            formData.append('NumOfBeds', allApartments.numOfBeds1)
            // formData.append('NumOfBeds', 89)

            formData.append('Price', allApartments.price1)
            formData.append('CategoryId', allApartments.category1)
            // formData.append('CategoryId',8)

            formData.append('Description',allApartments.description1)
        

            //  formData.append('FilelImages',allApartments.selectedFile1)
            //     console.log(allApartments.selectedFile1,"popop");
            
            for (const file of allApartments.selectedFile1) {
                formData.append('FilelImages', file);
              }
            
            // formData.append('FilelImages',...allApartments.selectedFile1)
            formData.append('ResponseOfUsers',allApartments.responseOfUsers1)
      
           
            const response = await axios.put(`https://localhost:7248/api/Apartment/${id}`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;
        }
        catch (error) {
            console.log(error);
            // return isRejectedWithValue(error)
        }
        // return {}
    }



export const removeApartment = (id)=>
   
    async ( thunkAPI) => {

        console.log('in removePost');
        const response = await axios.delete(`https://localhost:7248/api/Apartment/${id}`)
         console.log(response);
        return response.data
    }

export const apartmentSlice=createSlice({
    name:'apartment',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchApartments.fulfilled,(state,action)=>{
            state.status='fulfilled'
            state.apartmemts=action.payload
        })
        // builder.addCase(removeApartment.fulfilled, (state, action) => {
        //     console.log("mmmmm");
        //     state.status = 'fulfilled'
        //     state.apartmemts=action.payload
        // })
        // .addCase(removeApartment.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //     console.log('action.payload: ', action.payload);
        //     state.apartments = state.apartments.filter(apartment => apartment.id != action.payload.id);
        // })
        // .addCase(removeApartment.rejected, (state, action) => {
        //     state.status = 'rejected'
        //     console.log(action);
        // })
    }
})
export const{ }=apartmentSlice.actions
export default apartmentSlice.reducer