import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#f9f7f0] w-full py-4 px-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="mr-10">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Overkling Consult"
              width={100}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
        </div>
        <nav className="flex-1">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/dashboard"
                className="text-gray-800 hover:text-gray-600 font-medium px-1 py-2"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/project"
                className="text-gray-800 hover:text-gray-600 font-medium px-1 py-2"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/task"
                className="text-gray-800 hover:text-gray-600 font-medium px-1 py-2"
              >
                Task
              </Link>
            </li>
            <li>
              <Link
                href="/letter"
                className="text-gray-800 hover:text-gray-600 font-medium px-1 py-2"
              >
                Letter
              </Link>
            </li>
            <li>
              <Link
                href="/communication"
                className="text-[#8ca93e] hover:text-[#7a9235] font-medium px-1 py-2 border-b-2 border-[#8ca93e]"
              >
                Communication
              </Link>
            </li>
            <li>
              <Link
                href="/Reports"
                className="text-gray-800 hover:text-gray-600 font-medium px-1 py-2"
              >
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
