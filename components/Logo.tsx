import Image from "next/image";

function Logo(props: any) {
  const { renderDefault, title } = props;

  return (
    <div className="flex items-center space-x-2 ">
      <Image
        src="/logo.jpeg"
        alt="logo"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
      {renderDefault && <>{renderDefault(props)}</>}
    </div>
  );
}

export default Logo;
