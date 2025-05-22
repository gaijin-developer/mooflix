import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router";

import { loginUser } from "../services/authService";
import { useEffect, useState } from "react";
import NotificationBlock from "../components/ui/NotificationBlock";

function Login() {
  const [notification, setNotification] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (/^\w+/.test(value) ? null : "Invalid email"),
    },
  });
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const signIn = async (values: { email: string; password: string }) => {
    const response = await loginUser(values);
    if (response) {
      window.location.href = "/home";
    } else {
      setNotification(true);
    }
  };

  const closeNotification = () => {
    setNotification(false);
  };
  return (
    <div className="grid max-w-[500px] m-auto px-6">
      {notification && (
        <NotificationBlock
          color="red"
          notifText="ロッグインは出来ませんでした"
          closeNotif={closeNotification}
        />
      )}
      <form
        onSubmit={form.onSubmit((values) => signIn(values))}
        className="border-2 px-4 py-12 rounded-2xl mt-16"
      >
        <h2 className="text-center text-3xl">ログイン</h2>
        <div className=" space-y-4">
          <TextInput
            label="メール"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
            className="text-left "
          />
          <TextInput
            label="パッスワード"
            placeholder="************"
            type="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
            className="text-left"
          />

          <Group justify="center" mt="md">
            <Button type="submit">ログイン</Button>
          </Group>
          <div>
            <p>
              アカウントをお持ちでない方は、<Link to="/register">こちら</Link>
              からご登録ください。
            </p>
            <p>
              パスワード忘れた方は、<Link to="/forgot-password">こちら</Link>。
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
