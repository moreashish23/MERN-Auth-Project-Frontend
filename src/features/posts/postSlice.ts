import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, createPost, deletePost, updatePost } from "./postAPI";

interface PostState {
  posts: any[];
  loading: boolean;
}

const initialState: PostState = {
  posts: [],
  loading: false,
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (page: number, { rejectWithValue }) => {
    try {
      const res = await fetchPosts(page);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);


export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createPost(data);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Create failed"
      );
    }
  }
);

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (id: string, { rejectWithValue }) => {
    try {
      await deletePost(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          "Delete failed. Check authorization!"
      );
    }
  }
);


export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const res = await updatePost(id, data);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          "Update failed. Check authorization!"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
      })

      
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state) => {
        state.loading = false;
      })

      
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post: any) => post._id !== action.payload
        );
      })
      .addCase(removePost.rejected, (state) => {
        state.loading = false;
      })

   
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post: any) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(editPost.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default postSlice.reducer;