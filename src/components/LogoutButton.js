import { logout } from "../services/authService";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    await logout();
    onLogout(); // Callback to update UI
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
