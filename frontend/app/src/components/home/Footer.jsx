import { MdOutlineCopyright } from "react-icons/md";
export default function Footer() {
  const date = new Date();
  return (
    <footer className="md-lg:h-[50px] h-[60px] bg-[#121620]">
      <div className="mx-auto] container sm:w-[100%]">
        <div className="flex items-center justify-center py-3 text-white">
          <MdOutlineCopyright className="mx-1 text-white" />{" "}
          {date.getFullYear()} by ODAI
        </div>
      </div>
    </footer>
  );
}
