import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postSlice";
import toast from "react-hot-toast";

const CreatePost = () => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Post title is required");
      return;
    }

    if (form.title.trim().length < 5) {
      toast.error("Title must be at least 5 characters");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Post description is required");
      return;
    }

    if (form.description.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }

    setLoading(true);
    try {
      await dispatch(addPost(form)).unwrap();
      toast.success("Post created successfully!");
      setForm({ title: "", description: "" });
    } catch (err: any) {
      const msg = typeof err === "string" ? err : err?.message;
      toast.error(msg || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
        Create New Post
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          placeholder="Enter post title (min 5 characters)..."
          className="w-full p-2 sm:p-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Write your thoughts (min 10 characters)..."
          rows={3}
          className="w-full p-2 sm:p-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button
          disabled={loading}
          className="w-full sm:w-fit bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;