import API from "../../api/axios";

export const fetchPosts = (page: number) =>
  API.get(`/posts/all-posts?page=${page}`);

export const createPost = (data: any) =>
  API.post("/posts/create-post", data);

export const deletePost = (id: string) =>
  API.delete(`/posts/delete-post?_id=${id}`);

export const updatePost = (id: string, data: any) =>
  API.put(`/posts/update-post?_id=${id}`, data);