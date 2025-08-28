import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users/list");
        if (data.success) setUsers(data.users);
        else setError(data.message || "Failed to load users");
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(users.length / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  }, [users, currentPage]);

  if (loading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 md:p-6">
      
      <h2 className="mb-4 text-lg font-semibold">Users</h2>
      <div className="overflow-x-auto bg-white border rounded-md border-gray-300/70">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {paginated.map((u) => (
              <tr key={u._id || u.email} className="border-t border-gray-200">
                <td className="px-4 py-3">{u.username}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.role}</td>
                <td className="px-4 py-3">{u.isBanned ? "Banned" : "Active"}</td>
                <td className="px-4 py-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <button
                    className={`px-3 py-1 text-xs rounded ${u.isBanned ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
                    onClick={async () => {
                      try {
                        const { data } = await axios.post("http://localhost:5000/api/users/ban", { userId: u._id, isBanned: !u.isBanned });
                        if (data.success) {
                          setUsers(prev => prev.map(x => x._id === u._id ? { ...x, isBanned: !u.isBanned } : x));
                        }
                      } catch (err) {}
                    }}
                  >
                    {u.isBanned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "bg-primary text-white"}`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded ${num === currentPage ? "bg-primary text-white font-semibold" : "bg-gray-200"}`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? "cursor-not-allowed bg-gray-300" : "bg-primary text-white"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;


