'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSend() {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setAnswer(data.response || '(No response)');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setInput('');
    setAnswer('');
    setError('');
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Chat with AI</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !loading) handleSend();
        }}
        className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleSend}
          disabled={loading}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
        <button
          onClick={handleClear}
          disabled={loading}
          className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="mb-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded p-3">
          {error}
        </div>
      )}

      {answer && !error && (
        <div className="whitespace-pre-wrap text-gray-800 bg-green-100 border border-green-300 rounded p-4">
          {answer}
        </div>
      )}

      {!answer && !error && !loading && (
        <div className="text-sm text-gray-400 text-center">
          Enter a prompt and press Send.
        </div>
      )}
    </div>
  );
}
