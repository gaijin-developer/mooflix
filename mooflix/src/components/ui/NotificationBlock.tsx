import { useGSAP } from "@gsap/react";
import { Notification } from "@mantine/core";
import { useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {
  color?: string;
  notifText: string;
  closeNotif: () => void;
};

function NotificationBlock({ color, notifText, closeNotif }: Props) {
  const notificationContainer = useRef(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".notifContainer",
        { right: -300, opacity: 0 },
        { right: 10, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    },
    {
      scope: notificationContainer,
      //   dependencies: [color],
    }
  );
  return (
    <div ref={notificationContainer}>
      <div className="notifContainer max-w-[500px] absolute">
        <Notification
          title=""
          color={color}
          closeButtonProps={{ "aria-label": "Hide notification" }}
          onClick={closeNotif}
        >
          {notifText}
        </Notification>
      </div>
    </div>
  );
}

export default NotificationBlock;
