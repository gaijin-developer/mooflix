import { useForm } from "@mantine/form";
import { Button, Checkbox, Group, TextInput } from "@mantine/core";

function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <div className="max-w-[500px] m-auto">
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
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
  );
}

export default Login;
