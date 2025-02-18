import { useEffect, useState, React } from "react";
import Timeline from "./components/Timeline";
import Login from "./components/Login";
import { getCurrentUser, logout } from "./services/authService";
import LogoutButton from "./components/LogoutButton";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getCurrentUser();
      if (loggedInUser) setUser(loggedInUser);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {
        user ? (
          <div className="App">
            <h3>Hola {user.nickname}</h3>
            <LogoutButton onLogout={handleLogout} />
            <Timeline />
          </div>
        ) : (
          <Login onLogin={setUser} />
        )
      }
    </div>
  );
}

export default App;
