import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    avatar: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      switch (user.role) {
        case 'student': navigate('/student'); break;
        case 'lecturer': navigate('/lecturer'); break;
        case 'prodi': navigate('/prodi'); break;
        case 'industry': navigate('/industry'); break;
        case 'admin': navigate('/admin'); break;
        default: navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

      {error && (
        <motion.div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500"
        >
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
          <option value="prodi">Prodi</option>
          <option value="industry">Industry</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL (optional)"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <div className="flex justify-between text-sm text-teal-600 mt-4">
        <Link to="/login" className="hover:underline">Already have an account?</Link>
        <a href="#" className="hover:underline">Need Help?</a>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <FaGoogle className="text-xl text-gray-600 hover:text-red-500 cursor-pointer" />
        <FaFacebook className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
        <FaLinkedin className="text-xl text-gray-600 hover:text-blue-800 cursor-pointer" />
      </div>
    </div>
  );
};

export default Register;
