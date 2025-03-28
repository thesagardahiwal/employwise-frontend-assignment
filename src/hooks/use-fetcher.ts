import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../pages/Users";
import toast from "react-hot-toast";

const useFetchUsers = (page: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      setError("Error deleting user");
      toast.error("Error deleting user")
    }
  };

  return { users, totalPages, handleDelete, error, loading };
};

export default useFetchUsers;
