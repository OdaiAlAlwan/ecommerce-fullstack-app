import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/Api";



export const GET_USERS = createAsyncThunk ('user/GET_USERS' , async (_ ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.get('api/v1/user',{headers : {
            Authorization:'Bearer ' + token
          }} )

        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
}) 


export const UsersSlice = createSlice ({
    name :'user',
    initialState: {
        loader : false ,
        data : []
    },
    reducers:{

    },
    extraReducers : (builder) => {
        builder.addCase(GET_USERS.pending , (state , { payload }) => {
            state.loader = true
        })
        builder.addCase(GET_USERS.rejected , (state , { payload }) => {
            state.loader = true
            state.errorMessage = payload
        })
        builder.addCase(GET_USERS.fulfilled , (state , {payload}) => {
            state.loader = false
            state.data = payload.data

           
        })

    }
})

export default UsersSlice.reducer