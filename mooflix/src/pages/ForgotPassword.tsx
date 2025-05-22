import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { useNavigate } from "react-router";

import { getPasswordRecoveryCode } from "../services/authService";
import { useEffect, useState } from "react";
import NotificationBlock from "../components/ui/NotificationBlock";

function ForgotPassword() {
  const [notification, setNotification] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "無効な電子メール"),
    },
  });
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const getRecoveryCode = async (values: { email: string }) => {
    const isSuccess = await getPasswordRecoveryCode(values);
    if (isSuccess) {
      navigate("/enter-recovery-code");
    } else {
      setNotification(true);
    }
  };

  const closeNotification = () => {
    setNotification(false);
  };
  return (
    <div>
      <div className="grid max-w-[500px] m-auto px-4">
        {notification && (
          <NotificationBlock
            color="red"
            notifText="アカウントをお持ちの方には、メールをお送りします。"
            closeNotif={closeNotification}
          />
        )}
        <form
          onSubmit={form.onSubmit((values) => getRecoveryCode(values))}
          className="border-2 px-4 py-12 rounded-2xl mt-16"
        >
          <h2 className="text-2xl text-center py-4">パスワードの回復</h2>
          <div className=" space-y-4">
            <TextInput
              label="メール"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
              className="text-left "
            />

            <Group justify="center" mt="md">
              <Button type="submit">コードもらう</Button>
            </Group>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
