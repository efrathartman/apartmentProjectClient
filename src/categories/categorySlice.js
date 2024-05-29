import { Description } from "@mui/icons-material"
import { create } from "@mui/material/styles/createTransitions"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    categories:[],
    status:'idle'
}
export const fetchCategories=createAsyncThunk(
    'categories/fetchCategories',
    async(thunkAPI)=>{
     console.log("in here");
      const response=await axios.get('https://localhost:7248/api/Category')  
      console.log(response);
      return response.data
    },
    
    
)

export const removeCategory = createAsyncThunk(
    
    async (id, thunkAPI) => {
        console.log('in removePost');
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/category/${id}`)
        console.log(response);
        return response.data
    },
)
export const categorySlice=createSlice({
    name:'category',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.status='fulfilled'
            state.categories=action.payload
        })
        builder.addCase(removeCategory.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(removeCategory.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            console.log('action.payload: ', action.payload);
            state.categories = state.categories.filter(category => category.id != action.payload.id);
        })
        .addCase(removeCategory.rejected, (state, action) => {
            state.status = 'rejected'
            console.log(action);
        })
    }
})
export const{ }=categorySlice.actions
export default categorySlice.reducer