import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-gray-600 text-center mb-6">
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
