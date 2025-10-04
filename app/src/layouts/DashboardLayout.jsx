import { Fragment, useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, RocketLaunchIcon, Squares2X2Icon, RectangleGroupIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { name: 'Dashboard', to: '/app', icon: RocketLaunchIcon },
  { name: 'My Websites', to: '/app/websites', icon: Squares2X2Icon },
  { name: 'Templates', to: '/app/templates', icon: RectangleGroupIcon },
  { name: 'Settings', to: '/app/settings', icon: Cog6ToothIcon },
]

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/50" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">SwiftSite</span>
                    <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-2">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                              `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-100 ${isActive ? 'text-indigo-600' : 'text-gray-700'}`
                            }
                            onClick={() => setSidebarOpen(false)}
                          >
                            <item.icon className="h-6 w-6" />
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                      <li className="mt-auto">
                        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
                          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <span className="text-xl font-bold text-indigo-600">SwiftSite</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-100 ${isActive ? 'text-indigo-600' : 'text-gray-700'}`
                    }
                  >
                    <item.icon className="h-6 w-6" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li className="mt-auto">
                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
                  <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-indigo-50 grid place-items-center text-indigo-600 font-semibold">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
