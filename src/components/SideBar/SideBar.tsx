import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from '@/assets/icon.svg';

interface NavigationProp {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  current: boolean;
}

interface SideBarProps {
  navigation: NavigationProp[];
  userName: string;
  userProfileImg: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SideBar: React.FC<SideBarProps> = ({ navigation, userName, userProfileImg }: SideBarProps) => {
  return (
    <div className='hidden lg:flex lg:flex-shrink-0'>
      <div className='flex w-64 flex-col'>
        <div className='flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100'>
          <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4'>
            <div className='flex flex-shrink-0 items-center px-4'>
              <Logo fill='#4f46e5' className='h-10 w-10' />
            </div>
            <nav className='mt-5 flex-1' aria-label='Sidebar'>
              <div className='space-y-1 px-2'>
                {navigation.map(item => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={isActive =>
                      classNames(
                        isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      )
                    }
                  >
                    <item.icon
                      className={classNames(item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 h-6 w-6')}
                      aria-hidden='true'
                    />
                    <p>{item.name}</p>
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
          <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
            <div className='flex items-center'>
              <div>
                <img className='inline-block h-9 w-9 rounded-full' src={userProfileImg} alt='' />
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>{userName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
