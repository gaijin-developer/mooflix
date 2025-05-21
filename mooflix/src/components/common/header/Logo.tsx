import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/home" className="text-white">
      <span className="font-black text-xl text-white">Logo</span>
    </Link>
  );
}

export default Logo;
