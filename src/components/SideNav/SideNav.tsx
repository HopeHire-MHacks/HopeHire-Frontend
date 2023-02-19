import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userAtom } from '@/utils/atoms/user';
import { NavLink } from 'react-router-dom';

import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ReactComponent as Logo } from '@/assets/icon.svg';
import AuthService from '@/api/Authentication/AuthService';

interface NavigationProp {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SideNav = (RenderComponent: React.ComponentType, navigation: NavigationProp[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hoc = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, _] = useRecoilState(userAtom);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const resetUserAtom = useResetRecoilState(userAtom);

    useEffect(() => {
      let data = null;
      if (user.employee?.profilePicture != null) {
        data = user.employee.profilePicture.data;
      } else if (user.employer?.logo != null) {
        data = user.employer.logo.data;
      }

      if (data == null) {
        return;
      }

      const blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' });
      setImageUrl(URL.createObjectURL(blob));
    }, [user]);

    const userLogout = () => {
      AuthService.logout();
      resetUserAtom();

      window.setTimeout(() => {
        window.location.reload();
      }, 500);
    };

    return (
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as='div' className='relative z-40 md:hidden' onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='h-full flex flex-col justify-between'>
                    <div className='flex-grow'>
                      <div className='flex flex-shrink-0 items-center px-4'>
                        <Logo fill='#FFFFFF' className='h-10 w-10' />
                      </div>
                      <div className='h-full mt-5 h-0 flex-1 overflow-y-auto'>
                        <nav className='space-y-1 px-2'>
                          {navigation.map(item => (
                            <NavLink
                              key={item.name}
                              to={item.href}
                              activeClassName='bg-indigo-800 text-white hover:bg-indigo-800 hover:text-white'
                              className='text-indigo-100 hover:bg-indigo-600 flex items-center px-2 py-2 text-base font-medium rounded-md'
                            >
                              <item.icon className='mr-4 h-6 w-6 flex-shrink-0 true-gray-600' aria-hidden='true' />
                              {item.name}
                            </NavLink>
                          ))}
                        </nav>
                      </div>
                    </div>
                    <button
                      className='text-indigo-100 hover:bg-indigo-600 flex items-center px-4 py-2 text-base font-medium rounded-md'
                      onClick={userLogout}
                    >
                      <ArrowLeftOnRectangleIcon className='true-gray-600 mr-4 h-6 w-6' />
                      Logout
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='w-14 flex-shrink-0' aria-hidden='true'>
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-grow flex-col overflow-y-auto bg-gray-100 pt-5'>
            <div className='flex flex-shrink-0 items-center px-4'>
              <Logo fill='#4f46e5' className='h-10 w-10' />
            </div>
            <div className='mt-5 flex flex-1 flex-col'>
              <nav className='flex-1 space-y-1 px-2 pb-4'>
                {navigation.map(item => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    activeClassName='text-gray-900 bg-gray-200 hover:bg-gray-200'
                    className={`text-gray-600 hover:bg-gray-50
                    group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                  >
                    <item.icon className='text-gray-400 mr-4 h-6 w-6' aria-hidden='true' />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <Menu as='div' className='relative'>
              <div>
                <Menu.Button className='w-full'>
                  <div className='w-full flex flex-shrink-0 border-t border-gray-200 p-4'>
                    <div className='flex items-center'>
                      <div>
                        <img className='inline-block h-9 w-9 rounded-full' src={imageUrl} alt='' />
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                          {user?.employee !== null ? user.employee.name : user?.employer !== null ? user.employer.name : 'Unknown User'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute left-3 z-10 mt-2 w-48 origin-top-left -top-2 -translate-y-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <Menu.Item as='button' onClick={userLogout} className='w-full'>
                    {({ active }) => (
                      <div className={classNames(active ? 'bg-gray-100' : '', 'w-full flex items-center justify-start px-2')}>
                        <ArrowLeftOnRectangleIcon className='text-gray-600 mr-4 h-6 w-6' />
                        <div className='block py-2 text-sm text-gray-600'>Logout</div>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <div className='flex flex-1 flex-col md:pl-64'>
          <div className='flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5 md:hidden'>
            <div>
              <Logo fill='#4f46e5' className='h-10 w-10' />
            </div>
            <div>
              <button
                type='button'
                className='-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900'
                onClick={() => setSidebarOpen(true)}
              >
                <span className='sr-only'>Open sidebar</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
          </div>

          <main>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
              <RenderComponent {...props} />
            </div>
          </main>
        </div>
      </div>
    );
  };

  hoc.displayName = 'MainPageLayout';
  return hoc;
};

export default SideNav;
