import React from 'react';

const stories = [
  {
    title: 'Rising Above Adversity: The Story of Sitia',
    description:
      'Sitia had always been a hard worker, but when she was diagnosed with kidney disease, she worried about how it would affect her career. She was able to find a supportive employer who made accommodations for her health needs. Today, Sitia is excelling in her career and is grateful for the platform that helped her find her footing again. She wishes that others to stand strong against such adversity and face difficulties one step at a time.',
    imageUrl: '/assets/stories/sitia_main.jpg',
    author: {
      name: 'Sitia',
      imageUrl: '/assets/stories/sitia.jpg',
    },
  },
  // {
  //   title: "A New Lease on Life: Raj Patel's story",
  //   description:
  //     'Raj Patel was once a successful executive, but his life took a turn when she was diagnosed with kidney disease. After years of struggling to find employment that would accommodate his health needs. HopeHire not only assisted him with job opportunities but also gave him a sense of community and support. Today, Karen is thriving in a new career and grateful for the second chance.',
  //   imageUrl:
  //     'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
  //   author: {
  //     name: 'Raj Patel',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  //   },
  // },
  {
    title: 'How Michael Johnson Found Purpose and Hope ',
    description:
      'Michaej Johnson had almost given up hope of finding a job that would accommodate his dialysis treatments. Through the HopeHire, he found a job that not only understood his condition but also allowed him to pursue his passion for cooking. Today, James is the head chef at a popular restaurant and is grateful for the opportunities provided by the job portal.',
    imageUrl: '/assets/stories/michael_main.png',
    author: {
      name: 'Michael Johnson',
      imageUrl: '/assets/stories/michael_johnson.jpg',
    },
  },
  {
    title: 'Reshaping Her Future Through Adversity',
    description:
      'Sarah Gomez had been unemployed for months and was struggling to find a job that would accommodate her dialysis treatments. Eventually, she found a job as a freelance web designer and discovered her passion for entrepreneurship. Now, Sarah has started her own web design business and is grateful for the job portal that helped her find employment and discover her true calling. Sarah is now looking to expand her business beyond design and is looking forward to the future.',
    imageUrl: '/assets/stories/sarah_main.jpg',
    author: {
      name: 'Sarah Gomez',
      imageUrl: '/assets/stories/sarah_gomez.jpg',
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
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Featuring You</h2>
          <p className='mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4'>
            Some aspiring stories of individuals that we could not help but to share.
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
