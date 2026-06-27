import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/Api";

export const Simulate_Checkout = createAsyncThunk(
  "order/Simulate_Checkout",
  async (cartId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) throw new Error("User is not authenticated");

      const { data } = await baseUrl.post(
        `api/v1/order/simulate-checkout/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred during checkout"
      );
    }
  }
);

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const Orderlist = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Simulate_Checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Simulate_Checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(Simulate_Checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default Orderlist.reducer;
