import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import NotificationBlock from "../components/ui/NotificationBlock";
import { submitNewPassword } from "../services/authService";

function NewPassword() {
  const [showNotif, setShownotif] = useState<boolean>(false);
  const [notifText, setNotifText] = useState<string>("");
  const navigate = useNavigate();
  const [registrationSucceeded, setRegistrationSucceeded] =
    useState<boolean>(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "password",
      repassword: "password",
    },

    validate: {
      password: (value) => (value.length >= 6 ? null : "パスワードが無効"),
      repassword: (value, values) =>
        value === values.password ? null : "パスワードが一致しない",
    },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (formData: typeof form.values) => {
    const response = await submitNewPassword(formData);

    if (response) {
      setNotifText("Created Successfully, redirecting");
      setRegistrationSucceeded(true);
      setShownotif(true);

      navigate("/login");
      return;
    } else {
      setNotifText("Failed to register new password");
      setRegistrationSucceeded(false);
      setShownotif(true);
    }
  };

  const closeNotification = () => {
    setNotifText("");
    setShownotif(false);
    setRegistrationSucceeded(false);
  };
  return (
    <div className="mt-6 p-6">
      {showNotif && (
        <NotificationBlock
          color={registrationSucceeded ? "green" : "red"}
          notifText={notifText}
          closeNotif={closeNotification}
        />
      )}
      <div className="max-w-[500px] m-auto">
        <form
          onSubmit={form.onSubmit((values) => submitForm(values))}
          className="border-2 px-4 py-12 rounded-2xl"
        >
          <h2 className="text-lg text-center">新しいパスワード</h2>
          <div className="space-y-4">
            <div className="space-y-4">
              <TextInput
                label="パッスワード"
                placeholder="************"
                type="password"
                key={form.key("password")}
                {...form.getInputProps("password")}
                className="text-left"
              />
              <TextInput
                label="入力パッスワード"
                placeholder="************"
                type="password"
                key={form.key("repassword")}
                {...form.getInputProps("repassword")}
                className="text-left"
              />
            </div>

            <Group justify="center" mt="md">
              <Button type="submit">保存する</Button>
            </Group>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
