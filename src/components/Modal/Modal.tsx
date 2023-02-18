import React, { Fragment, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { modalAtom, ModalType } from '@/utils/atoms/modal';

export default function Example() {
  const [modalState, setModalState] = useRecoilState(modalAtom);

  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={modalState.isShown} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={() => setModalState(prev => ({ ...prev, isShown: false }))}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div className='sm:flex sm:items-start'>
                  {modalState.type === ModalType.ERROR && (
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                    </div>
                  )}
                  {modalState.type === ModalType.INFO && (
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <InformationCircleIcon className='h-6 w-6 text-blue-600' aria-hidden='true' />
                    </div>
                  )}
                  {modalState.type === ModalType.SUCCESS && (
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <CheckCircleIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                    </div>
                  )}

                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                      {modalState.title}
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>{modalState.message}</p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className={`inline-flex w-full justify-center rounded-md border border-transparent 
                        font-medium text-white shadow-sm focus:outline-none focus:ring-2 px-4 py-2 text-base 
                        focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm
                        ${
                          ModalType.ERROR === modalState.type
                            ? 'hover:bg-red-700 focus:ring-red-500 bg-red-600'
                            : ModalType.INFO === modalState.type
                            ? 'hover:bg-blue-700 focus:ring-blue-500 bg-blue-600'
                            : 'hover:bg-green-700 focus:ring-green-500 bg-green-600'
                        }`}
                    onClick={() => {
                      modalState.onPrimaryBtnClick && modalState.onPrimaryBtnClick();
                      setModalState(prev => ({ ...prev, isShown: false }));
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'
                    onClick={() => {
                      modalState.onSecondaryBtnClick && modalState.onSecondaryBtnClick();
                      setModalState(prev => ({ ...prev, isShown: false }));
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
