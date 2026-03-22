import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts/postSlice";
import type { RootState } from "../app/store";

const Home = () => {
  const dispatch = useDispatch<any>();
  const { posts, loading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(getPosts(1));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 lg:px-12 py-6">
      
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Explore Posts
        </h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          Discover thoughts shared by developers
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-400">Loading...</p>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post: any) => (
          <div
            key={post._id}
            className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-md hover:bg-gray-800 transition"
          >
            {/* Title */}
            <h2 className="text-lg font-semibold text-blue-400">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              {post.description}
            </p>

            {/* Author */}
            <p className="text-xs sm:text-sm text-gray-500 mt-3">
              {post.userId?.email}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No posts available yet 
        </p>
      )}
    </div>
  );
};

export default Home;