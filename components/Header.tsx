import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            src="/logo.jpeg"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        </Link>
        <h1>Vitaly Hope</h1>
      </div>

      <div>
        <Link
          href="https://github.com/Hope87"
          className="px-5 py-3 text-sm md:text-base bg-gray-900 text-[#F7AB0A] flex items-center rounded-full text-center"
        >
          Sign up to the Source code
        </Link>
      </div>
    </header>
  );
}

export default Header;
