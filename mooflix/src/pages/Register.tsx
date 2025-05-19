import { useForm } from "@mantine/form";
import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import axios from "axios";

function Register() {
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
    },
  });

  const submitForm = async (formData: typeof form.values) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    console.log(backendUrl);

    const response = await axios.post(`${backendUrl}/register`, formData);
    console.log(response);
  };
  return (
    <div className="mt-6">
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
