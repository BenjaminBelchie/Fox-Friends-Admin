import Image from 'next/image';
import { useState } from 'react';
import {
  HomeIocn,
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
  LogoutIcon,
} from '~/constants/icons';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <div
        className={` ${
          open ? 'w-40' : 'w-72 '
        } flex h-screen flex-col bg-gray-800 p-3 shadow duration-300`}>
        <div className="space-y-3">
          <div className="ml-2 flex items-center gap-3">
            <img src="./logo.png" height={32} width={32} alt="Logo" />
            <p className="text-xl text-white">Fox & Friends Admin</p>
          </div>
          <div className="flex-1">
            <ul className="space-y-1 pb-4 pt-2 text-sm">
              <li className="rounded-s4 mb-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 rounded-md p-2">
                  <HomeIocn />
                  <span className="text-gray-100">Overview</span>
                </a>
              </li>
              <span className="px-6 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400">
                Manage
              </span>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center space-x-3 rounded-md p-2">
                  <ProductsIcon />
                  <span className="text-gray-100">Products</span>
                </a>
              </li>
              <li className="rounded-s4">
                <a
                  href="#"
                  className="mb-4 flex items-center space-x-3 rounded-md p-2">
                  <OrdersIcon />
                  <span className="text-gray-100">Orders</span>
                </a>
              </li>
              <span className="px-6  py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400">
                User
              </span>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center space-x-3 rounded-md p-2">
                  <SettingsIcon />
                  <span className="text-gray-100">Settings</span>
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center space-x-3 rounded-md p-2">
                  <LogoutIcon />
                  <span className="text-gray-100">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12">
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total users
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              12,00
            </div>
          </div>
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total Profit
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              $ 450k
            </div>
          </div>
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total Orders
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">20k</div>
          </div>
        </div>
      </div>
    </div>
  );
}
