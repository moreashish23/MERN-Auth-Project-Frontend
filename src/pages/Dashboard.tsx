import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, removePost, editPost } from "../features/posts/postSlice";
import type { RootState } from "../app/store";
import CreatePost from "./CreatePost";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch<any>();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  });

  // DELETE
  const handleDelete = async (id: string) => {
    try {
      await dispatch(removePost(id)).unwrap();
      toast.success("Post deleted ");
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  };

  // START EDIT
  const handleEdit = (post: any) => {
    setEditId(post._id);
    setEditForm({
      title: post.title,
      description: post.description,
    });
  };

  // SAVE EDIT
  const handleUpdate = async (id: string) => {
    try {
      await dispatch(editPost({ id, data: editForm })).unwrap();
      toast.success("Post updated ");
      setEditId(null);
    } catch (err: any) {
      toast.error(err?.message || "Update failed");
    }
  };

  useEffect(() => {
    dispatch(getPosts(1));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 lg:px-12 py-6">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Your Dashboard
      </h1>

      {/* Create Post */}
      <CreatePost />

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-400 mt-4">Loading...</p>
      )}

      {/* Posts Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post: any) => (
          <div
            key={post._id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-md hover:bg-gray-800 transition"
          >
            
            {/* EDIT MODE */}
            {editId === post._id ? (
              <div className="space-y-2">
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(post._id)}
                    className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-600 px-3 py-1 rounded text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* NORMAL VIEW */}
                <h2 className="text-lg font-semibold text-blue-400">
                  {post.title}
                </h2>

                <p className="text-gray-300 mt-2 text-sm">
                  {post.description}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {post.userId?.email}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;