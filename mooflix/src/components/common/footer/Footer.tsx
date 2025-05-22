import { Text } from "@mantine/core";

function Footer() {
  return (
    <div className="py-12 bg-gray-400/40">
      <Text ta={"center"}>&copy; {new Date().getFullYear()}</Text>
    </div>
  );
}

export default Footer;
