import React from 'react';

const stories = [
  {
    title: 'Improve your customer experience 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Daniela Metz',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Daniela Metz',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    author: {
      name: 'Daniela Metz',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

const Stories = () => {
  return (
    <div id='stories' className='relative px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28'>
      <div className='absolute inset-0'>
        <div className='h-1/3 sm:h-2/3' />
      </div>
      <div className='relative mx-auto max-w-7xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Featured Stories</h2>
          <p className='mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
          </p>
        </div>
        <div className='mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3'>
          {stories.map(story => (
            <div key={story.title} className='flex flex-col overflow-hidden rounded-lg shadow-lg'>
              <div className='flex-shrink-0'>
                <img className='h-48 w-full object-cover' src={story.imageUrl} alt='' />
              </div>
              <div className='flex flex-1 flex-col justify-between bg-white p-6'>
                <div className='flex-1'>
                  <p className='text-xl font-semibold text-gray-900'>{story.title}</p>
                  <p className='mt-3 text-base text-gray-500'>{story.description}</p>
                </div>
                <div className='mt-6 flex items-center'>
                  <div className='flex-shrink-0'>
                    <span className='sr-only'>{story.author.name}</span>
                    <img className='h-10 w-10 rounded-full' src={story.author.imageUrl} alt='' />
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm font-medium text-gray-900'>{story.author.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
