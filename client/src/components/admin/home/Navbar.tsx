import Image from "next/image";
import hiyoLogo from "../../../../public/hiyo_logo.svg";

export const Navbar = () => {
  return (
    <div className="w-full flex flex-col justify-between shadow-md">
      <Image priority src={hiyoLogo} alt="Hiyo Logo" width={150} />
    </div>
  );
};
