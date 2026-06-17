import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Cookies from "universal-cookie"
import { baseUrl } from "../../services/Api";


const cookie = new Cookies()

export const Auth_Login = createAsyncThunk ( 'auth/Auth_Login' , async (info , {rejectWithValue , fulfillWithValue}) => {
    try{
        const { data }   = await baseUrl.post('api/v1/auth/login' , info , { withCredentials : true})
        localStorage.setItem('Token', data.token);
        return fulfillWithValue(data)
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
})

export const LOG_OUT = createAsyncThunk ('auth/LOG_OUT' , async (_, { dispatch }) => {
    try {
        await baseUrl.get('api/v1/auth/logOut',{headers:{
            Authorization: 'Token' 
        }})
        localStorage.removeItem('Token');
        cookie.remove('Token')

    }catch (error){
        console.log(error)
    }
})


export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
    try {
        const response = await baseUrl.post('/api/v1/auth/refreshToken', {}, { withCredentials: true });
        const { token } = response.data;
        localStorage.setItem('Token', token);
        return { token };
    } catch (error) {
        throw new Error('Unable to refresh token');
    }
});






export const AuthUserSlice = createSlice({    
    name : "auth",
    initialState: {
        successMessage : '',
        errorMessage : '',
        loader : false ,  
        isLogin : false ,      
        role : '',
        userName : '',
        userId : ' ',
        token : ''
    },
    reducers:{
        messageClear : (state,_) => {
            state.errorMessage = ''
        },
        restoreLogin: (state, action) => {
            state.isLogin = true;
            state.token = action.payload.token;
            state.role = action.payload.role
            state.userName = action.payload.name
            state.userId =action.payload._id
            
        }
        
    },
    extraReducers : (builder) => {
        builder.addCase(Auth_Login.pending , (state , { payload }) => {
            state.loader = true
        })
        builder.addCase(Auth_Login.rejected , (state , { payload }) => {
            state.loader = false
            state.errorMessage = payload 
        })
        builder.addCase(Auth_Login.fulfilled , (state , { payload }) => {
            state.isLogin = true
            state.loader = false
            state.successMessage = payload.message
            state.role = payload.data.role
            state.userName = payload.data.name
            state.token = payload.data.token
            state.userId = payload.data._id

            
        })
        builder.addCase(LOG_OUT.fulfilled , ( state , { payload }) => {
            state.successMessage = ''
            state.errorMessage = ''
            state.isLogin = false
            state.role = ''
            state.token = ''
            state.userName = ''
            state.loader = false
           
        })

    }
})

export const { messageClear , restoreLogin } = AuthUserSlice.actions

export default AuthUserSlice.reducer