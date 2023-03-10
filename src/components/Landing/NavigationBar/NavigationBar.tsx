import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '@/assets/icon.png';

import { Dialog } from '@headlessui/react';
import { routes } from '@/constants/routes';
import useCurrentPath from '@/utils/hooks/useCurrentPath';
import { useHistory } from 'react-router-dom';

const navigation = [
  { name: 'Features', href: routes.landing.features },
  { name: 'Stories', href: routes.landing.stories },
  { name: 'Patients', href: routes.landing.patients },
  { name: 'Employers', href: routes.landing.employers },
];

const NavigationBar = () => {
  const history = useHistory();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = useCurrentPath() ?? '';
  const authPaths = [routes.authentication.login, routes.authentication.signup];
  const isAuthPage = authPaths.includes(currentPath);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const id = href.replace('/#', '');
    console.log(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.push(href);
    }
  };

  return (
    <div className='px-6 pt-6 lg:px-8'>
      <nav className='flex items-center justify-between' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <a href={routes.home} className='-m-1.5 p-1.5'>
            <span className='sr-only'>HopeHire</span>
            <img className='h-8' src={Logo} alt='' />
          </a>
        </div>
        <div className='flex lg:hidden'>
          {!isAuthPage && (
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          )}
        </div>
        {!isAuthPage && (
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map(item => (
              <a
                key={item.name}
                href={item.href}
                onClick={e => smoothScroll(e, item.href)}
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          {!isAuthPage && (
            <a href={routes.authentication.login} className='text-sm font-semibold leading-6 text-gray-900'>
              Log in <span aria-hidden='true'>&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      {!isAuthPage && (
        <Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className='fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden'>
            <div className='flex items-center justify-between'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Your Company</span>
                <img className='h-8' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600' alt='' />
              </a>
              <button type='button' className='-m-2.5 rounded-md p-2.5 text-gray-700' onClick={() => setMobileMenuOpen(false)}>
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>

            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map(item => (
                    <a
                      onClick={e => smoothScroll(e, item.href)}
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {!isAuthPage && (
                  <div className='py-6'>
                    <a
                      onClick={() => history.push(routes.authentication.login)}
                      href='#'
                      className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
                    >
                      Log in
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
};

export default NavigationBar;
