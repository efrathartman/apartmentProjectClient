import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categories/categorySlice'
import usersReducer from './users/userSlice'
import apartmentsReducer from './apartmemts/apartmentSlice'
export const store = configureStore({
  reducer: {
    categories:categoriesReducer,
     users:usersReducer,
     apartmemts:apartmentsReducer
  },
})