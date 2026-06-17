import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import  { baseUrl }  from "../../services/Api";



export const Get_Product = createAsyncThunk("Productlist/Get_Product", async (_ ,{rejectWithValue }) => {
    try {
        const  { data }  = await baseUrl.get('api/v1/products')
        return data
    } catch (error){
        return rejectWithValue(error.response.data.message)
    }
}) 
 

export const Get_AllProduct_WithSearch = createAsyncThunk(
    "Productlist/Get_AllProduct_WithSearch", 
    async ({ sort, category, keyword }, { rejectWithValue }) => {
      try {
        const queryParams = new URLSearchParams();
        if (sort) queryParams.append("sort", sort);
        if (category) queryParams.append("category", category);
        if (keyword) queryParams.append("keyword", keyword);

       
        
        const { data } = await baseUrl.get(`api/v1/products?${queryParams.toString()}`);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  



export const Get_Product_By_Id = createAsyncThunk(
    "Productlist/Get_Product_By_Id", 
    async (id ,{rejectWithValue }) => {
    try{
        const { data } =  await baseUrl.get(`api/v1/products/${id}`)
        return data
    }catch (error){
        return rejectWithValue(error.response.data.message)
    }
}) 

export const Update_Product_By_Id = createAsyncThunk(
    "Productlist/Update_Product_By_Id",
    async ({ productId, updatedData }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("Token");
        const { data } = await baseUrl.put(
          `api/v1/products/${productId}`,
          updatedData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data", 
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "An error occurred");
      }
    }
);

export const Add_Product = createAsyncThunk(
    "Productlist/Add_Product",
    async (product ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        const  { data }  = await baseUrl.post('api/v1/products', product ,{
            headers : {        
            Authorization:'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
            
        }})
        return data
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 

export const Delete_Product = createAsyncThunk(
    "Productlist/Delete_Product",
    async (productId ,{rejectWithValue }) => {
    try{
        const token = localStorage.getItem("Token")
        await baseUrl.delete(`api/v1/products/${productId}`, {
            headers: {        
              Authorization: 'Bearer ' + token,
            }
          });
        return productId;
    }catch (error){
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
}) 


export const Productlist = createSlice({
    initialState: {
        loader : false ,
        data : [] ,
        error: null
    },
    name:"Productlist",
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(Get_Product.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Get_Product.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Get_Product.fulfilled , (state , {payload}) => {
            state.loader = false
            state.data = payload.data || payload;
            state.error = null;
        })
        builder.addCase(Get_AllProduct_WithSearch.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Get_AllProduct_WithSearch.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Get_AllProduct_WithSearch.fulfilled , (state , {payload}) => {
            state.loader = false
            state.data = payload.data || payload;
            state.error = null;
        })
        builder.addCase(Add_Product.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Add_Product.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Add_Product.fulfilled , (state , {payload}) => {
            state.loader = false;
            state.data = [...state.data, payload];
            state.error = null;
            
        })
        builder.addCase(Delete_Product.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Delete_Product.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Delete_Product.fulfilled , (state, { meta }) => {
            state.loader = false;
            state.error = null;
            state.data = state.data.filter((product) => product._id !== meta.arg);
        })
        builder.addCase(Get_Product_By_Id.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Get_Product_By_Id.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Get_Product_By_Id.fulfilled , (state, { payload, error }) => {
            state.loader = false;
            state.error = null;
            state.data = Array.isArray(payload.data) ? payload.data : [payload.data];
        })
        builder.addCase(Update_Product_By_Id.pending , (state , {payload}) => {
            state.loader = true
            state.error = null;
            
        })
        builder.addCase(Update_Product_By_Id.rejected , (state, { payload, error }) => {
            state.loader = false
            state.error = payload || error.message;
            
        })
        builder.addCase(Update_Product_By_Id.fulfilled , (state, { meta }) => {
            state.loader = false;
            state.error = null;
            state.data = state.data.map((product) =>
                product._id === meta.arg ? { ...product, ...meta.payload } : product
              );
            
        })

    }
    
})

export default Productlist.reducer;