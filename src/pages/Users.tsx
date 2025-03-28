import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchUsers from "../hooks/use-fetcher";
import Loading from "../components/loading-show";
import ErrorMessage from "../components/error-show";

const UserCard = lazy(() => import("../components/user-card"));

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Users: React.FC = () => {
  const [page, setPage] = useState(1);
  const { users, totalPages, handleDelete, error, loading } = useFetchUsers(page);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">User List</h2>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} handleDelete={handleDelete} navigate={navigate} />
            ))}
          </div>
        </Suspense>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-6 py-3 text-lg font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-6 py-3 bg-blue-600/70 text-white rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
