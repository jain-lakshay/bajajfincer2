import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../types/form';
import { createUser } from '../services/api';
import { UserCircle2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserData>({
    rollNumber: '',
    name: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createUser(formData);
      localStorage.setItem('rollNumber', formData.rollNumber);
      localStorage.setItem('userName', formData.name);
      navigate('/form');
    } catch (err) {
      console.log(err)
      setError('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen rounded-lg shadow-lg flex items-center justify-center bg-gray-100 p-0">
  <div className="bg-white shadow-lg rounded-xl flex w-full h-full max-w-6xl overflow-hidden">
    
    {/* Left Section (Image and Info) */}
    <div className="w-full sm:w-1/2 bg-gray-200 flex flex-col items-center justify-center p-6">
      <img 
        src="https://bsmedia.business-standard.com/_media/bs/img/article/2018-10/23/full/1540299206-3916.jpg" 
        alt="Student Login Visual" 
        className="rounded-lg shadow-md w-60 h-auto object-cover"
      />
      <h2 className="text-xl font-semibold text-gray-800 mt-6 text-center">Empower Your Learning Journey</h2>
      <p className="text-gray-600 text-center mt-4 px-4 text-sm sm:text-base leading-relaxed">
        <span className="block sm:inline">Lakshay Jain</span>{' '}
        <span className="hidden sm:inline">|</span>{' '}
        <span className="block sm:inline">RA2211028030020</span>{' '}
        <span className="hidden sm:inline">|</span>{' '}
        <span className="block sm:inline">CSE-CC</span>{' '}
        <span className="hidden sm:inline">|</span>{' '}
        <span className="block sm:inline">SRMIST</span>
      </p>
    </div>

    {/* Right Section (Form) */}
    <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
      <div className="text-center mb-8">
        <UserCircle2 className="w-16 h-16 mx-auto text-black-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Student Login</h2>
        <p className="text-gray-600 mt-2">Enter your details to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="rollNumber" className="form-label">Roll Number</label>
          <input
            type="text"
            id="rollNumber"
            className="input"
            value={formData.rollNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            className="input"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  </div>
</div>

  
  );
}

export default LoginForm;