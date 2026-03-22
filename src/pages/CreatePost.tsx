import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postSlice";
import toast from "react-hot-toast";

const CreatePost = () => {
  const dispatch = useDispatch<any>();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      toast.error("All fields required");
      return;
    }

    try {
      await dispatch(addPost(form)).unwrap();
      toast.success("Post created 🚀");

      setForm({ title: "", description: "" });
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-6">
      
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
        ✍️ Create New Post
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        {/* Title Input */}
        <input
          placeholder="Enter post title..."
          className="w-full p-2 sm:p-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        {/* Description */}
        <textarea
          placeholder="Write your thoughts..."
          rows={3}
          className="w-full p-2 sm:p-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        {/* Button */}
        <button
          className="w-full sm:w-fit bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition"
        >
          🚀 Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;