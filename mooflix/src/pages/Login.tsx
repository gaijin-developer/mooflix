import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { Link } from "react-router";

import { loginUser } from "../services/userService";
import { useEffect } from "react";
import { getToken } from "../services/appService";

function Login() {
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
    async function fetchToken() {
      const tk = await getToken();
      console.log(tk);
    }

    fetchToken();
  }, []);

  return (
    <div className="max-w-[500px] m-auto">
      <form
        onSubmit={form.onSubmit((values) => loginUser(values))}
        className="border-2 px-4 py-12 rounded-2xl"
      >
        <h2 className="text-lg">ログイン</h2>
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
