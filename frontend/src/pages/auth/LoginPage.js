import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Alert } from '@/components/ui/alert';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();

//const handleSubmit = async (e) => {
  //e.preventDefault();
  //setError('');
  //try {
    //await login(formData.email, formData.password);
 // } catch (err) {
   // setError('Invalid credentials. Please try again.');
 // }
//};
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(''); // Reset error before attempting login
  try {
    await login(formData); // Call mock login
  } catch (err) {
    setError(err.message); // Show error message if credentials are wrong
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">Sign in</h2>
        </div>
        {error && <Alert variant="destructive">{error}</Alert>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
        <div className="text-center">
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
