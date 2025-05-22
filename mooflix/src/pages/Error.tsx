import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center">
        <h1 className="my-6">迷ったかもしれない</h1>
        <Link to="/home">
          <Button className="text-4xl">ホームへ</Button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
