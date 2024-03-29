import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Reset() {
    const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null)
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError(null); // Reset error when input changes
  };





  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let endpoint;
      // Determine endpoint based on the input value
      if (inputValue.includes("@")) {
        // If input value contains "@" symbol, assume it's an email
        endpoint = "http://localhost:8000/otp";
      } else {
        // Otherwise, assume it's a username
        endpoint = "http://localhost:8000/otp";
      }
      console.log(inputValue);
      const response = await axios.post(endpoint,{"input":inputValue});

      if (response.status === 200) {
        console.log(response.data.code);
        navigate('/otp', { state: { user:inputValue,code:response.data.code ,username:response.data.username}});
            } else {
      }
    }catch (error) {
      console.error("Error:", error);
      setError(error.response.data.message);
     // alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow-sm">
        <h2 className="mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputValue">Enter Email or Username</label>
            <input
              type="text"
              name="inputValue"
              id="inputValue"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your email or username"
              className={`form-control ${error ? 'is-invalid' : ''}`} // Apply 'is-invalid' class if error exists
              required
            />
            {error && <div className="invalid-feedback">{error}</div>}
            </div>
          <button
            type="submit"
            className="mt-2 btn btn-primary w-100"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
