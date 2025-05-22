import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { submitPasswordRecoveryCode } from "../../services/authService";
import { useState } from "react";
import NotificationBlock from "../ui/NotificationBlock";
import { useNavigate } from "react-router";

function PassWordRecoveryCode() {
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      code: "",
    },

    validate: {
      code: (value) => (/^\d+/.test(value) ? null : "無効なコード"),
    },
  });
  const submitCode = async (values: { code: string }) => {
    const response = await submitPasswordRecoveryCode(values);
    if (response) {
      navigate("/new-password");
    } else {
      setShowNotif(true);
    }
  };
  const closeNotif = () => {
    setShowNotif(false);
  };
  return (
    <div className="grid max-w-[500px] m-auto px-4">
      {showNotif && (
        <NotificationBlock
          color={"red"}
          notifText="コードの検証に問題が発生しました。"
          closeNotif={closeNotif}
        />
      )}
      <form
        onSubmit={form.onSubmit((values) => submitCode(values))}
        className="border-2 px-4 py-12 rounded-2xl mt-16"
      >
        <h2 className="text-2xl text-center py-4">パスワードの回復</h2>
        <div className=" space-y-4">
          <TextInput
            label="コード"
            placeholder="000000"
            key={form.key("code")}
            {...form.getInputProps("code")}
            className="text-left "
          />

          <Group justify="center" mt="md">
            <Button type="submit">コード送信</Button>
          </Group>
        </div>
      </form>
    </div>
  );
}

export default PassWordRecoveryCode;
