import { useForm } from "@mantine/form";
import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import NotificationBlock from "../components/ui/NotificationBlock";
import { registerUser } from "../services/authService";

function Register() {
  const [showNotif, setShownotif] = useState<boolean>(false);
  const [notifText, setNotifText] = useState<string>("");
  const navigate = useNavigate();
  const [registrationSucceeded, setRegistrationSucceeded] =
    useState<boolean>(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "password",
      repassword: "password",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "無効なメール"),
      firstName: (value) => (value.length > 0 ? null : "無効な姓"),
      lastName: (value) => (value.length > 0 ? null : "無効な姓"),
      phone: (value) =>
        value.length > 8 && value.length < 12 ? null : "無効な電話",
      password: (value) => (value.length >= 6 ? null : "パスワードが無効"),
      repassword: (value, values) =>
        value === values.password ? null : "パスワードが一致しない",
      termsOfService: (value) => (value == true ? null : "同意してください"),
    },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (formData: typeof form.values) => {
    const response = await registerUser(formData);

    if (response) {
      setNotifText("Created Successfully, redirecting");
      setRegistrationSucceeded(true);
      setShownotif(true);
      return;
    } else {
      //   const exErr = error as AxiosError;
      setNotifText("Failed to register new User");
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
    <div className="mt-6">
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
          <h1 className="text-lg">登録</h1>
          <div className="space-y-4">
            <div className="flex gap-2 w-full">
              <TextInput
                label="姓"
                placeholder="木村"
                key={form.key("firstName")}
                {...form.getInputProps("firstName")}
                className="text-left w-full"
              />
              <TextInput
                label="名"
                placeholder="島袋"
                key={form.key("lastName")}
                {...form.getInputProps("lastName")}
                className="text-left w-full"
              />
            </div>
            <div className="space-y-4">
              <TextInput
                label="メール"
                placeholder="your@email.com"
                key={form.key("email")}
                {...form.getInputProps("email")}
                className="text-left w-full"
              />
              <TextInput
                label="電話"
                placeholder="090**********"
                key={form.key("phone")}
                {...form.getInputProps("phone")}
                className="text-left w-full"
              />
            </div>
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

            <Checkbox
              mt="md"
              label="プライバシーポリシー同意する"
              key={form.key("termsOfService")}
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />

            <Group justify="center" mt="md">
              <Button type="submit">ログイン</Button>
            </Group>
            <div>
              <p>
                すでにアカウントをお持ちですか？<Link to="/login">こちら</Link>
                からサインインしてください。
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
