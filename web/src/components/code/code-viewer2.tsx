import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import { Code2, Copy, Check } from "lucide-react";
import { useState } from "react";
import "prismjs/components/prism-python";
import "prismjs/components/prism-cpp";

export function CodeViewer2({ code }: { code: string }) {
  const [language, setLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageOptions = {
    cpp: languages.cpp,
    python: languages.python,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Code Viewer</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
            </select>

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-gray-900">
            <Editor
              value={code}
              onValueChange={(code) => {}}
              highlight={(code) => highlight(code, languages.python, language)}
              // highlight={code => highlight(code, languageOptions[language], language)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: "transparent",
                color: "#fff",
              }}
              className="min-h-[300px] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Type or paste your code above to see syntax highlighting in action
        </div>
      </div>
    </div>
  );
}
