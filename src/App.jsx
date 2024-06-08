import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

const preplaceholder = "Get your Answer Here...";

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showClearButton, setShowClearButton] = useState(false); // State for clear button visibility
  const [isLoading, setIsLoading] = useState(false); // State for loading animation
  const [selectedFile, setSelectedFile] = useState(null); // State for storing the selected file

  async function generateAnswer() {
    setAnswer(''); // Clear previous answer before making the API call
    setIsLoading(true); // Show loading skeleton

    const response = await axios({
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCwjWW1vP-fMRs-hyeH_ZgLSj-3JTvfLj0',
      method: 'POST',
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });
    setAnswer(response.data.candidates[0].content.parts[0].text);
    setQuestion(''); // Clear question after generating answer (unchanged)
    setShowClearButton(false); // Hide clear button after generating answer (unchanged)
    setIsLoading(false); // Hide loading skeleton
  }

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setShowClearButton(e.target.value.length > 0); // Show clear button only when there's text
  };

  const handleClearClick = () => {
    setQuestion('');
    setShowClearButton(false); // Hide clear button after clicking clear
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file.');
      return;
    }

    setSelectedFile(file);
  };

  // Implement upload functionality here (explained in comments below)

  useEffect(() => {
    // Clear answer and hide loading skeleton on component mount
    setAnswer('');
    setIsLoading(false);
  }, []); // Empty dependency array for effect to run only on mount

  return (
    <>
      <h1>Scenario Labs</h1>
      <textarea
        value={question}
        onChange={handleQuestionChange}
        cols="100"
        rows="2"
      />
      {showClearButton && (
        <button id="clear" onClick={handleClearClick}>
          X
        </button>
      )}
      <br />
      <button onClick={generateAnswer}>Generate Answer</button>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <br /> <br />
      {isLoading && <div className="skeleton-answer"></div>} <br />
      {isLoading && <div className="skeleton-answer"></div>} <br />
      {isLoading && <div className="skeleton-answer"></div>} <br />
      {isLoading && <div className="skeleton-answer"></div>} <br />
      {isLoading && <div className="skeleton-answer"></div>} <br />
      {isLoading && <div className="skeleton-answer"></div>} <br />
      {isLoading && <div className="skeleton-answer"></div>} <br />
      {isLoading && <div className="skeleton-answer"></div>}
      <pre>{answer ? '' : preplaceholder}{answer}</pre>
    </>
  );
}

export default App;
