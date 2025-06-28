import Image from "next/image";
import logo from "./../img/logo.png"; 

export default function Header() {
  return (
    <header className="flex flex-col text-center p-4 items-center">
      <div className="container mx-auto">
        <Image
          src={logo}
          alt="Marvel Logo"
          width={300}
          height={300}
          className="mx-auto mb-2"
        />
        <h2 className="text-2xl text-gray-dark uppercase ">explore o universo</h2>
        <p className="mt-0 text-gray-medium">Mergulhe no domínio de todos os personagens clássicos que você ama - e aquelas que você descobrirá em breve!</p>
      </div>
    </header>
  );
}
