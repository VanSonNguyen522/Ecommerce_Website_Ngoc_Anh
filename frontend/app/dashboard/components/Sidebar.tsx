
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="px-6 py-6">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <nav className="flex flex-col gap-4 p-4">
        <Link href="/dashboard"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            {/* <HomeIcon className="w-5 h-5" /> */}
            Home
        </Link>

        <Link href="/dashboard/Product" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            {/* <ChartBarIcon className="w-5 h-5" /> */}
            Product
        </Link>

        <Link href="/dashboard/Profile" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            {/* <UserIcon className="w-5 h-5" /> */}
            Profile
        </Link>

        <Link href="/dashboard/Cart" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            {/* <UserIcon className="w-5 h-5" /> */}
            Cart
        </Link>

        <Link href="/dashboard/Bill" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            {/* <UserIcon className="w-5 h-5" /> */}
            Bill
        </Link>
      </nav>
    </aside>
  );
};

export { Sidebar };
