import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main  className="text-center text-2xl h-screen flex flex-col justify-center items-center font-bold gap-10">

    
      <Link href="/userlist">Go to User List Page</Link>
      
    </main>
  );
}
