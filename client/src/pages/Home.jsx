import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home({ user }) {
  const [languages, setLanguages] = useState([]);

  // Backend API URL from environment variables or default
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (user) {
      const fetchLanguages = async () => {
        try {
          const { data } = await axios.get(`${API_BASE_URL}/api/codes`);
          const uniqueLanguages = [...new Set(data.map(code => code.language))];
          setLanguages(uniqueLanguages);
        } catch (error) {
          console.error("Error fetching languages:", error);
        }
      };
      fetchLanguages();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {user ? (
        <section className="w-full max-w-5xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Programming Languages
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map(lang => (
              <Link
                key={lang}
                to={`/language/${lang}`}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100"
              >
                <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {lang}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Code Storage
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            A sleek platform to store, view, and share code snippets across multiple programming languages. 
            Log in or register to access syntax-highlighted code examples and seamless copying features.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105"
            >
              Register
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
