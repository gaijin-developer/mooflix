import { Button, Input } from "@mantine/core";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const searchBarContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (showSearchBar) {
        gsap.fromTo(
          ".search-box",
          { width: 0, opacity: 0 },
          { width: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    },
    { scope: searchBarContainer, dependencies: [showSearchBar] }
  );

  const showSearchBarInput = () => {
    setShowSearchBar(true);
  };
  return (
    <div className="flex">
      {showSearchBar && (
        <div ref={searchBarContainer}>
          <div className="search-box">
            <Input placeholder="動画タイトル" />
          </div>
        </div>
      )}
      <b>検索</b>
      <Button color="black" onClick={showSearchBarInput}>
        {" "}
        <Search />{" "}
      </Button>
    </div>
  );
}

export default SearchBar;
