import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase/firebase';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/feed" className="text-lg font-bold">
        Social App
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
