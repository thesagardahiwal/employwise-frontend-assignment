import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading-show";
import ErrorMessage from "../components/error-show";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data.");
        toast.error("Failed to load user data.");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      toast.success("User updated successfully!");
      navigate("/users");
    } catch (err) {
      setError("Failed to update user.");
      toast.error("Failed to update user.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white/30 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-center">Edit User</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="First Name"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            className="w-full px-4 bg-slate-950/70 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            className="w-full px-4 bg-slate-950/70 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-3 bg-slate-950/70 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600/60 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
