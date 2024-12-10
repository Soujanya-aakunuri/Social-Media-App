import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/feed');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
