
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/Api";


export const Add_ToCart = createAsyncThunk(
  "Cartlist/Add_ToCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) throw new Error("User is not authenticated");

      const { data } = await baseUrl.post(
        "api/v1/cart",
        { productId },
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
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const GETLogged_User_ProductCart = createAsyncThunk(
  "Cartlist/GETLogged_User_ProductCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const res = await baseUrl.get("api/v1/cart", {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "There is no cart for you"
      ) {
        return {
          status: "success",
          numOfCartItems: 0,
          data: {
            cartItems: [],
            totalCartPrice: 0,
          },
        };
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

// تنظيف السلة
export const Delete_Cart = createAsyncThunk(
  "cart/Delete_Cart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) throw new Error("User is not authenticated");

      await baseUrl.delete("api/v1/cart", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred while clearing the cart"
      );
    }
  }
);


export const Update_CartItemQuantity = createAsyncThunk(
  "cart/Update_CartItemQuantity",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) throw new Error("User is not authenticated");

      const { data } = await baseUrl.put(
        `api/v1/cart/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { itemId, quantity, updatedData: data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);


export const Delete_ItemAtCart = createAsyncThunk(
  "cart/Delete_ItemAtCart",
  async (ItemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      await baseUrl.delete(`api/v1/cart/${ItemId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return ItemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const initialState = {
  data: {}, // يُتوقع أن يحتوي على { cartItems: [...], totalCartPrice: ... }
  loading: false,
  error: null,
  numOfCartItems: 0,
};

const Cartlist = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(Add_ToCart.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(Add_ToCart.fulfilled, (state, action) => {
        state.loader = false;
        state.data = action.payload;
      })
      .addCase(Add_ToCart.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })
      .addCase(GETLogged_User_ProductCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(GETLogged_User_ProductCart.fulfilled, (state, action) => {
        state.loading = false;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data || {};
      })
      .addCase(GETLogged_User_ProductCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Delete_Cart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Delete_Cart.fulfilled, (state) => {
        state.loading = false;
        state.data = { cartItems: [], totalCartPrice: 0 };
        state.numOfCartItems = 0;
      })
      .addCase(Delete_Cart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Delete_ItemAtCart.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(Delete_ItemAtCart.rejected, (state, { payload, error }) => {
        state.loader = false;
        state.error = payload || error.message;
      })
      .addCase(Delete_ItemAtCart.fulfilled, (state, { meta }) => {
        state.loader = false;
        state.error = null;
        if (state.data.cartItems) {
          state.data.cartItems = state.data.cartItems.filter(
            (item) => item._id !== meta.arg
          );
        }
      })
      .addCase(Update_CartItemQuantity.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.error = null;
        const { itemId, quantity } = payload;
        const itemIndex = state.data.cartItems?.findIndex(
          (item) => item._id === itemId
        );
        if (itemIndex !== -1) {
          state.data.cartItems[itemIndex].quantity = quantity;
        }
      });
  },
});

export default Cartlist.reducer;
