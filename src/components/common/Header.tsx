import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">Voyager</div>
      <nav>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <span>Please login</span>
        )}
      </nav>
    </header>
  );
};
