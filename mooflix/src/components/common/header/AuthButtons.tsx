import { Link } from "react-router";
import Button from "../../ui/Button";

function AuthButtons() {
  return (
    <div className="flex gap-6">
      <Link to="/login" className="text-white">
        <Button className="text-[var(--text-primary)]">ログイン</Button>
      </Link>
      <Link to="/register">
        <Button className="text-[var(--text-primary)]">サインアップ</Button>
      </Link>
    </div>
  );
}

export default AuthButtons;
