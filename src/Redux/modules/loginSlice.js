import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../Instance/instance";
import setToken from "../../Pattern/setToken";
import { setCookie } from "../../Shared/cookie";

export const __login = createAsyncThunk("LOGIN", async (payload, thunkAPI) => {
  console.log(payload.email, payload.password);
  try {
    setToken();
    const { data } = await instance.post("/user/login", {
      email: payload.email,
      password: payload.password,
    });
    setCookie("token", data.token, {
      path: "/",
      expire: "after60m", //서버에서 토큰 유효시간이 얼마나 되는지 물어보기
    });
    // localStorage.setItem("", data);
    alert("로그인 성공!");
    return thunkAPI.fulfillWithValue(console.log(data.token)); //data만 들어오면 에러가 난다? 직렬화의 에러(action을 실을 수 없는 것들)
  } catch (error) {
    alert("아이디어와 비밀번호를 다시 확인해주세요.");
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  email: "",
  password: "",
  //   login: false,
  isLoading: false,
  error: "",
};

const loginSlice = createSlice({
  name: "LOGIN_USER",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__login.fulfilled, (state) => {
        state.isLoading = true;
        // state.login = true;
      })
      .addCase(__login.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default loginSlice.reducer;
