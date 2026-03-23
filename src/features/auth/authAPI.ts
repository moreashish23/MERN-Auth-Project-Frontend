import API from "../../api/axios";

export const signupUser = (data: any) =>
  API.post("/auth/signup", data);

export const loginUser = (data: any) =>
  API.post("/auth/signin", data);

export const sendVerificationCode = (data: any) =>
  API.patch("/auth/send-verification-code", data);

export const verifyCode = (data: any) =>
  API.patch("/auth/verify-verification-code", data);

export const sendForgotPasswordCode = (data: any) =>
  API.patch("/auth/send-forgot-password-code", data);

export const resetPassword = (data: any) =>
  API.patch("/auth/verify-forgot-password-code", data);