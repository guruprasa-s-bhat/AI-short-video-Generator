import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { useContext } from "react";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src={"/MajorLogo.jpeg"} width={30} height={30} alt="Logo" />
        <Link href="/">
          {" "}
          {/* Wrap the logo text with Link */}
          <h2 className="font-bold text-xl cursor-pointer">AI Short Video</h2>
        </Link>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Image src={"/dollar.png"} width={20} height={20} alt="Logo" />
          <h2>{userDetail?.credits}</h2>
        </div>
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
