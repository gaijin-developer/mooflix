import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";

function AuthButtons() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const logoutUser = () => {
    sessionStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <div className="flex gap-6">
      {isLoggedIn && (
        <Button
          className="text-[var(--text-primary)] hover:bg-[var(--background-secondary)"
          onClick={logoutUser}
        >
          ログアウト
        </Button>
      )}

      {!isLoggedIn && (
        <div className="flex gap-4">
          <Link to="/login" className="text-white">
            <Button className="text-[var(--text-primary)] ">ログイン</Button>
          </Link>
          <Link to="/register">
            <Button className="text-[var(--text-primary)]">サインアップ</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AuthButtons;
