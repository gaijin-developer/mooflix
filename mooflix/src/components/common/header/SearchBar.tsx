import { Button, Input } from "@mantine/core";
import { Search } from "lucide-react";
import { useState, type MouseEvent } from "react";

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const showSearchBarInput = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };
  return (
    <div className="flex">
      {showSearchBar && <Input placeholder="動画タイトル" />}
      <b>検索</b>
      <Button color="black" onClick={showSearchBarInput}>
        {" "}
        <Search />{" "}
      </Button>
    </div>
  );
}

export default SearchBar;
