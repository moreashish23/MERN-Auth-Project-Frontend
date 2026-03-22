import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginUser, signupUser, sendVerificationCode, verifyCode } from "./authAPI";
import type { AuthState } from "./authTypes";

const token = localStorage.getItem("token");

// ✅ Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

// ✅ Async Thunk (Login)
export const login = createAsyncThunk<
  any, // response type (can improve later)
  any, // request type
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await loginUser(data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Something went wrong"
    );
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await signupUser(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const sendCode = createAsyncThunk(
  "auth/sendCode",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await sendVerificationCode(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await verifyCode(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

// ✅ Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 LOGIN PENDING
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ LOGIN SUCCESS
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;

        const token = action.payload.token;
        localStorage.setItem("token", token);
      })

      // ❌ LOGIN FAILED
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      // SIGNUP
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })

      // SEND CODE
      .addCase(sendCode.fulfilled, (state) => {
        state.loading = false;
      })

      // VERIFY USER
      .addCase(verifyUser.fulfilled, (state) => {
        state.loading = false;
      })

      
  },
});

// ✅ Exports
export const { logoutState, clearError } = authSlice.actions;
export default authSlice.reducer;