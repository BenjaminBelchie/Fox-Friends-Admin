import {
  HomeIocn,
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
  LogoutIcon,
} from '~/constants/icons';

export default function Sidebar() {
  return (
    <div
      className={
        'flex h-screen w-80 flex-col bg-gray-800 p-3 shadow duration-300'
      }>
      <div className="space-y-3">
        <div className="ml-2 flex items-center gap-3">
          <img src="/logo.png" height={32} width={32} alt="Logo" />
          <p className="text-xl text-white">Fox & Friends Admin</p>
        </div>
        <div className="flex-1">
          <ul className="space-y-1 pb-4 pt-2 text-sm">
            <li className="rounded-s4 mb-4">
              <a
                href="/"
                className="flex items-center space-x-3 rounded-md p-2">
                <HomeIocn />
                <span className="text-gray-100">Overview</span>
              </a>
            </li>
            <span className="px-6 py-4 text-[0.6rem] font-bold uppercase text-gray-400 dark:text-gray-400">
              Manage
            </span>
            <li className="rounded-sm">
              <a
                href="/products/new"
                className="flex items-center space-x-3 rounded-md p-2">
                <ProductsIcon />
                <span className="text-gray-100">New Product</span>
              </a>
            </li>
            <li className="rounded-s4">
              <a
                href="/orders"
                className="mb-4 flex items-center space-x-3 rounded-md p-2">
                <OrdersIcon />
                <span className="text-gray-100">Orders</span>
              </a>
            </li>
            <span className="px-6  py-4 text-[0.6rem] font-bold uppercase text-gray-400 dark:text-gray-400">
              User
            </span>
            <li className="rounded-sm">
              <a
                href="/settings"
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
  );
}
