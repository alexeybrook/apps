import React, { useState } from 'react';
import './App.css';

function extractAndBeautifyJSON(text) {
  // Try to find the first JSON object or array in the text
  // This regex matches the first {...} or [...] block
  const jsonRegex = /([\[{][\s\S]*[\]}])/m;
  const match = text.match(jsonRegex);
  if (!match) return '';
  let jsonStr = match[1];
  try {
    try{
      const parsed = JSON.parse(jsonStr);
      jsonStr = JSON.stringify(parsed, null, 2);
    } catch (e) {
      jsonStr = jsonStr.replace(/\\"/g, '"');
      const parsed = JSON.parse(jsonStr);
      jsonStr = JSON.stringify(parsed, null, 2);
    }
    // Unescape quotes and unicode
    jsonStr = jsonStr.replace(/\\"/g, '"');
    jsonStr = jsonStr.replace(/\\n/g, ' ');
    jsonStr = jsonStr.replace(/\\u([0-9a-fA-F]{4})/g, (m, g1) => String.fromCharCode(parseInt(g1, 16)));
    return jsonStr;
  } catch (e) {    
    return 'Cannot parse JSON: ' + e.message;
  }
}

function App() {
  const [input, setInput] = useState('');
  const output = extractAndBeautifyJSON(input);

  return (
    <div className="App">
      <h1>JSON Extractor & Beautifier</h1>
      <div className="split-container">
        <textarea
          className="input-area"
          placeholder="Paste or type text containing JSON here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={20}
        />
        <textarea
          className="output-area"
          value={output}
          placeholder="Beautified JSON will appear here."
          readOnly
          rows={20}
        />
      </div>
      <div className="footer">
        <small>Paste the text containing JSON on the left and the beautified JSON will appear on the right</small>
      </div>
    </div>
  );
}

export default App;
