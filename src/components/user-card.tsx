interface UserCardProps {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      avatar: string;
    };
    handleDelete: (id: number) => void;
    navigate: (path: string) => void;
  }
  
  const UserCard: React.FC<UserCardProps> = ({ user, handleDelete, navigate }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-center">{user.first_name} {user.last_name}</h3>
        <div className="flex justify-center mt-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            onClick={() => navigate(`/edit/${user.id}`)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default UserCard;