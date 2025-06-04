import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleGenerateOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/generate-otp', { question });
      if (res.data.block) {
        setAnswer(res.data.message);
        return;
      }
      setShowOtp(res.data.otp);
      setOtpSent(true);
      setError('');
    } catch (err) {
      setError("Error generating OTP");
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/answer', { question, otp });
      setAnswer(res.data.answer);
    } catch (err) {
      setError("Invalid OTP or error fetching answer.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Program Bot 1</h2>
      <input
        type="text"
        placeholder="Ask your programming question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
      <button onClick={handleGenerateOtp} style={{ marginTop: '10px' }}>Get OTP</button>

      {showOtp && (
        <div>
          <p><strong>Your OTP:</strong> {showOtp}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {answer && <p><strong>Bot:</strong> {answer}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;


export default App;
