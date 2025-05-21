import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="border-2 min-h-screen grid items-center">
      <div>
        <h1 className="my-6">迷ったかもしれない</h1>
        <Link to="/home">
          <Button className="text-4xl">ホームへ</Button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
