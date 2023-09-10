import {
  HomeIocn,
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
  LogoutIcon,
} from '~/constants/icons';
import Link from 'next/link';
import { env } from '~/env.mjs';

export default function Sidebar() {
  return (
    <div
      className={
        'fixed flex h-screen w-72 flex-col justify-between overflow-x-hidden bg-gray-800 p-3 shadow duration-300'
      }>
      <div className="space-y-3">
        <div className="ml-2 flex items-center gap-3">
          <img src="/logo.png" height={32} width={32} alt="Logo" />
          <p className="text-xl text-white">Fox & Friends Admin</p>
        </div>
        <div className="flex-1">
          <ul className="space-y-1 pb-4 pt-2 text-sm">
            <li className="rounded-s4 mb-4">
              <Link
                href="/"
                className="flex items-center space-x-3 rounded-md p-2">
                <HomeIocn />
                <span className="text-gray-100">Dashboard</span>
              </Link>
            </li>
            <span className="px-6 py-4 text-[0.6rem] font-bold uppercase text-gray-400 dark:text-gray-400">
              Manage
            </span>
            <li className="rounded-sm">
              <Link
                href="/products"
                className="flex items-center space-x-3 rounded-md p-2">
                <ProductsIcon />
                <span className="text-gray-100">Products</span>
              </Link>
            </li>
            <li className="rounded-s4">
              <Link
                href="/orders"
                className="mb-4 flex items-center space-x-3 rounded-md p-2">
                <OrdersIcon />
                <span className="text-gray-100">Orders</span>
              </Link>
            </li>
            <span className="px-6  py-4 text-[0.6rem] font-bold uppercase text-gray-400 dark:text-gray-400">
              User
            </span>
            <li className="rounded-sm">
              <Link
                href="/settings"
                className="flex items-center space-x-3 rounded-md p-2">
                <SettingsIcon />
                <span className="text-gray-100">Settings</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link
                href="/api/auth/logout"
                className="flex items-center space-x-3 rounded-md p-2">
                <LogoutIcon />
                <span className="text-gray-100">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-2">
        <div className="w-fit rounded-xl bg-white px-3 py-2">
          <p className="text-sm font-semibold">
            {env.NEXT_PUBLIC_HOST.toLocaleLowerCase().includes('preview')
              ? 'Preview Environment'
              : env.NEXT_PUBLIC_HOST.toLocaleLowerCase().includes('local')
              ? 'Local Environment'
              : 'Production Environment'}
          </p>
        </div>
      </div>
    </div>
  );
}
