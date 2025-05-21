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
    navigate("/");
  };
  return (
    <div className="flex gap-6">
      {isLoggedIn && (
        <Button
          className="text-[var(--text-primary)] hover:bg-[var(--background-secondary)"
          onClick={logoutUser}
          color="black"
          fz={16}
        >
          ログアウト
        </Button>
      )}

      {!isLoggedIn && (
        <div className="flex gap-4">
          <Link to="/login" className="text-white">
            <Button
              color="black"
              className="text-[var(--text-primary)]"
              fz={16}
            >
              ログイン
            </Button>
          </Link>
          <Link to="/register">
            <Button
              color="black"
              className="text-[var(--text-primary)]"
              fz={16}
            >
              サインアップ
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AuthButtons;
