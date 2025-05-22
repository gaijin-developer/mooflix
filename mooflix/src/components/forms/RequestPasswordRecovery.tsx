import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";

import { useState } from "react";

import NotificationBlock from "../ui/NotificationBlock";
import { getPasswordRecoveryCode } from "../../services/authService";

function RequestPasswordRecovery({
  setRecoveryCode,
}: {
  setRecoveryCode: () => void;
}) {
  const [showNotification, setShowNotification] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "frank.entsie301@gmail.com",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const getRecoveryCode = async (values: { email: string }) => {
    await getPasswordRecoveryCode(values);
    setRecoveryCode();
    setShowNotification(true);
  };
  const closeNotification = () => {
    setShowNotification(false);
  };
  return (
    <div className="grid max-w-[500px] m-auto px-4">
      {showNotification && (
        <NotificationBlock
          color={"none"}
          notifText={
            "If you have an account with use, we will send you an email with a verification code"
          }
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
  );
}

export default RequestPasswordRecovery;
