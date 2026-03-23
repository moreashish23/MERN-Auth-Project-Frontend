import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loginUser,
  signupUser,
  sendVerificationCode,
  verifyCode,
  sendForgotPasswordCode,
  resetPassword,
} from "./authAPI";
import type { AuthState } from "./authTypes";

const token = localStorage.getItem("token");


const initialState: AuthState = {
  user: token
    ? {
        email: "",
        verified: true,
      }
    : null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};


export const login = createAsyncThunk<
  any,
  any,
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

// ✅ SEND FORGOT PASSWORD CODE
export const sendForgotCode = createAsyncThunk(
  "auth/sendForgotCode",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await sendForgotPasswordCode(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

// ✅ RESET PASSWORD
export const resetUserPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await resetPassword(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

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

   
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;

        const token = action.payload.token;
        localStorage.setItem("token", token);

        
        state.user = {
          email: action.payload.email || "",
          verified: action.payload.verified ?? true,
        };
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

     
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    
      .addCase(sendCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendCode.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(sendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

   
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(sendForgotCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendForgotCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendForgotCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

     
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { logoutState, clearError } = authSlice.actions;
export default authSlice.reducer;