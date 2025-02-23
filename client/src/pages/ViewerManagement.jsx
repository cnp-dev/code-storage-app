import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewerManagement() {
  const [viewers, setViewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchViewers = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get('/api/viewers', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setViewers(data);
      } catch (err) {
        setError('Failed to load viewers. Please try again.');
        console.error('Error fetching viewers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchViewers();
  }, []);

  const deleteViewer = async (id) => {
    try {
      await axios.delete(`/api/viewers/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setViewers(viewers.filter(viewer => viewer._id !== id));
    } catch (err) {
      console.error('Error deleting viewer:', err);
      alert('Failed to delete viewer. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Manage Viewers
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Control access by managing viewer accounts.
          </p>
        </header>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center"
              >
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Viewer List */
          <div className="space-y-4">
            {viewers.length > 0 ? (
              viewers.map(viewer => (
                <div
                  key={viewer._id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex justify-between items-center group"
                >
                  <span className="text-gray-800 font-medium text-lg">
                    {viewer.username}
                  </span>
                  <button
                    onClick={() => deleteViewer(viewer._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium opacity-90 hover:opacity-100 hover:bg-red-600 transition-all duration-200 transform group-hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No viewers found. Add some to get started!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewerManagement;