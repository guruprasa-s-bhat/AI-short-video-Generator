import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>hello user</h1>
      <Button>subsribe</Button>
      <UserButton />
    </div>
  );
}
