import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, createPost , deletePost, updatePost} from "./postAPI";

interface PostState {
  posts: any[];
  loading: boolean;
}

const initialState: PostState = {
  posts: [],
  loading: false,
};

// ✅ GET POSTS
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (page: number) => {
    const res = await fetchPosts(page);
    return res.data.data;
  }
);

// ✅ CREATE POST
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data: any) => {
    const res = await createPost(data);
    return res.data.data;
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
        err?.response?.data?.message || "Delete failed Check you are authorized person or Not!"
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
        err?.response?.data?.message || "Update failed Check you are authorized person or Not!"
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

      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })

      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
            (post: any) => post._id !== action.payload
        );
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post: any) =>
            post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(editPost.rejected, (state, action: any) => {
        state.loading = false;
      });
  },
});

export default postSlice.reducer;