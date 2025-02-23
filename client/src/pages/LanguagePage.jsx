import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock.jsx';

function LanguagePage() {
  const { language } = useParams();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/codes');
        const filteredCodes = data.filter(code => code.language === language);
        setCodes(filteredCodes);
      } catch (error) {
        console.error('Error fetching codes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCodes();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight capitalize">
            {language} Code Snippets
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Explore and copy {language} code examples with ease.
          </p>
        </header>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Code Snippets */
          <div className="space-y-6">
            {codes.length > 0 ? (
              codes.map(code => (
                <div
                  key={code._id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                >
                  <CodeBlock code={code.code} language={code.language} />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No {language} snippets found yet. Be the first to add one!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguagePage;