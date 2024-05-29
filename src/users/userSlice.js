import { Password } from "@mui/icons-material"
import { create } from "@mui/material/styles/createTransitions"
import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    users:[],
    status:'idle',
    nameLogin:''
}
export const fetchUsers=createAsyncThunk(
    'users/fetchUsers',
    async(thunkAPI)=>{
     console.log("in here");
      const response=await axios.get('https://localhost:7248/api/User')  
      console.log(response);
      return response.data
    },
    
    
)
export const addUser=(name,email,password,phone)=>
     
    async(thunkAPI)=>{
        console.log("add");
        console.log(name,email,password,phone);
        try{
        const response=await axios.post('https://localhost:7248/api/User' ,   
        {
            Name:name,
            Email:email,
            Password:password,
            Phone:phone

        })
        return response.data
    }catch(error)
    {
        return isRejectedWithValue(error)
    }
}
export const removeUser = createAsyncThunk(
    
    async (id, thunkAPI) => {
        console.log('in removePost');
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/user/${id}`)
        console.log(response);
        return response.data
    },
)
export const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
     updateUser:(state,action)=>
     {
        state.nameLogin=action.payload
     }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status='fulfilled'
            state.users=action.payload
        })
        builder.addCase(removeUser.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(removeUser.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            console.log('action.payload: ', action.payload);
            state.users = state.users.filter(u => u.id != action.payload.id);
        })
        .addCase(removeUser.rejected, (state, action) => {
            state.status = 'rejected'
            console.log(action);
        })
    }
})
export const{ updateUser}=userSlice.actions
export default userSlice.reducer