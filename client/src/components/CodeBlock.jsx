import { useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

function CodeBlock({ code, language }) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied!');
  };

  // Normalize language and provide fallback
  const editorLanguage = language && typeof language === 'string' 
    ? language.toLowerCase() 
    : 'plaintext';

  // Log for debugging
  useEffect(() => {
    console.log('CodeBlock - Language:', editorLanguage, 'Code:', code);
  }, [editorLanguage, code]);

  // Configure Monaco before mounting
  const beforeMount = (monaco) => {
    // Ensure language support is loaded
    const languages = monaco.languages.getLanguages();
    if (!languages.some(lang => lang.id === editorLanguage)) {
      console.warn(`Language '${editorLanguage}' not recognized, falling back to plaintext`);
    }
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
      <MonacoEditor
        height="200px"
        language={editorLanguage}
        value={code || ''} // Ensure value is never undefined
        theme="vs-dark" // VS Code dark theme
        beforeMount={beforeMount}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          automaticLayout: true, // Fix rendering in cloud environments
          wordWrap: 'on', // Improve readability for long lines
        }}
      />
      <button
        onClick={copyCode}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Copy
      </button>
    </div>
  );
}

export default CodeBlock;