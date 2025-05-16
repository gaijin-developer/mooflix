import AuthButtons from "./AuthButtons";
import Logo from "./Logo";

function Header() {
  return (
    <header className="flex justify-between px-4 py-2">
      <Logo />
      <AuthButtons />
    </header>
  );
}

export default Header;
