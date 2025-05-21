import { Image } from "@mantine/core";

import AuthButtons from "../components/common/header/AuthButtons";
import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) window.location.href = "/home";
  }, []);
  return (
    <div>
      <div className="h-screen relative bg-blue-500">
        <Image
          src="https://images.pexels.com/photos/2507025/pexels-photo-2507025.jpeg"
          fit="cover"
          h={"100%"}
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/50 font-bold grid place-items-center z-1">
          <div className="flex flex-col items-center">
            <h1>一緒に映画観ませんか？</h1>
            <h2 className="mt-12 text-2xl font-bold">家族と？ 　友達と？</h2>

            <div className="mt-12">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
