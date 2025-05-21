import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="relative h-12">
      <header className="fixed top-0 flex justify-between px-4 py-2 z-2 w-full bg-black/30">
        <Logo />
        <div className="flex gap-4">
          {sessionStorage.getItem("access_token") && <SearchBar />}
          <AuthButtons />
        </div>
      </header>
    </header>
  );
}

export default Header;
