import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchUsers from "../hooks/use-fetcher";
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
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense fallback={<p className='text-center'>Loading users...</p>}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} handleDelete={handleDelete} navigate={navigate} />
            ))}
          </Suspense>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded mr-2 disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded ml-2 disabled:opacity-50"
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