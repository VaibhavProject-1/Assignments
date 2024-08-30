// // src/pages/Login.tsx
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, name });
//       if (response.status === 200) {
//         dispatch(login({ email, name }));
        
//         toast.success('Login successful!', {
//           position: 'top-right', // Correct way to set the position
//         });
        
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       setError('Invalid email or name');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
//       <ToastContainer />
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchStudentData } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from '../redux/store'; // Import AppDispatch and RootState

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const navigate = useNavigate();

  const darkMode = useSelector((state: RootState) => state.theme.darkMode); // Get dark mode from Redux

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, name });
      //console.log(response.data); // Check what the backend returns
      if (response.status === 200) {
        

        // Dispatch the login action
        dispatch(login({ email, name }));

        // Fetch and store student data
        await dispatch(fetchStudentData(email));

        toast.success('Login successful!', {
          position: 'top-right',
        });

        // Navigate to the dashboard
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Error during login:', error);

      let errorMessage = 'Login failed. Please try again.';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold rounded-lg ${
            darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
