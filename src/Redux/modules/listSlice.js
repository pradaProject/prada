import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../Instance/instance";

export const __getPostBox = createAsyncThunk(
  "GET_POST",
  async ({ num, page }, thunkAPI) => {
    try {
      const { data } = await instance.get(
        `/posts?categoryId=${num}&page=${page}`
      );
      return thunkAPI.fulfillWithValue({ ...data, num, page });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  postList: [],
  search: false,
  authenticate: false,
  category: false,
};

const listSlice = createSlice({
  name: "POST_SLICE",
  initialState,
  reducers: {
    setAuthenticate: (state, action) => {
      state.authenticate = action.payload;
    },
    searching: (state, action) => {
      state.search = action.payload;
    },
    searchCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //
      .addCase(__getPostBox.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostBox.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(__getPostBox.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { searching, setAuthenticate, searchCategory } = listSlice.actions;
export default listSlice.reducer;
