import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="flex justify-between px-4 py-2">
      <Logo />
      <div className="flex gap-4">
        <SearchBar />
        <AuthButtons />
      </div>
    </header>
  );
}

export default Header;
