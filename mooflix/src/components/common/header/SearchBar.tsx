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
      <form action="">
        <div className="flex gap-4 items-center">
          {showSearchBar && (
            <div ref={searchBarContainer}>
              <div className="search-box">
                <Input placeholder="動画タイトル" name="s" />
              </div>
            </div>
          )}

          <Button color="black" onClick={showSearchBarInput}>
            {/* <b>検索</b> */}
            <Search />{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
