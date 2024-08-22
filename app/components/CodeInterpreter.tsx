import React, { useState } from 'react';

interface CodeInterpreterProps {
  onCodeSubmit: (result: string) => void;
}

const CodeInterpreter: React.FC<CodeInterpreterProps> = ({ onCodeSubmit }) => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Update the API endpoint to match the new route in your app directory
      const response = await fetch('/api/assistants/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      onCodeSubmit(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Running...' : 'Run Code'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CodeInterpreter;
