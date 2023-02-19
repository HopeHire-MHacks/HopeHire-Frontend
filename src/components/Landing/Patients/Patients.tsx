import React from 'react';
import img from '@/assets/dialysis.png';

const Patients = () => {
  return (
    <div id='patients' className='overflow-hidden bg-white'>
      <div className='relative mx-auto max-w-7xl py-16 px-6 lg:px-8'>
        <div className='absolute top-0 bottom-0 left-3/4 hidden w-screen bg-gray-50 lg:block' />
        <div className='mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8'>
          <div>
            <h2 className='font-semibold leading-6 text-indigo-600'>For Patients</h2>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>On a mission to help others</h2>
          </div>
        </div>
        <div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
          <div className='relative lg:col-start-2 lg:row-start-1'>
            <svg
              className='absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block'
              width={404}
              height={384}
              fill='none'
              viewBox='0 0 404 384'
              aria-hidden='true'
            >
              <defs>
                <pattern id='de316486-4a29-4312-bdfc-fbce2132a2c1' x={0} y={0} width={20} height={20} patternUnits='userSpaceOnUse'>
                  <rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
                </pattern>
              </defs>
              <rect width={404} height={384} fill='url(#de316486-4a29-4312-bdfc-fbce2132a2c1)' />
            </svg>
            <div className='relative mx-auto max-w-prose text-base lg:max-w-none'>
              <figure>
                <div className='aspect-w-12 aspect-h-7 lg:aspect-none'>
                  <img
                    className='rounded-lg object-cover object-center shadow-lg'
                    src={img}
                    alt='Whitney leaning against a railing on a downtown street'
                    width={1184}
                    height={1376}
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className='mt-8 lg:mt-0'>
            <div className='mx-auto max-w-prose text-base lg:max-w-none'>
              <p className='text-lg text-gray-500'>
                At HopeHire, we understand the challenges that kidney patients face when it comes to finding employment opportunities.
                That&#39;s why we created a job portal that&#39;s specifically designed with the health and physical conditions of kidney
                patients in mind.
              </p>
            </div>
            <div className='prose prose-indigo mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none'>
              <p>
                Our recommendation AI serves potential job opportunities that match your skillset, experience, and most importantly, your
                health needs. We believe that everyone deserves an equal opportunity to find fulfilling work, regardless of their health
                conditions.
              </p>
              <p>
                By creating a professional profile on HopeHire, you can easily manage your job applications and get noticed by employers who
                understand and accommodate your health needs. Let us help you find hope and the opportunity to thrive in your career.
              </p>
              <p>With HopeHire, these are just some ways of how we can assist in your job search</p>
              <ul role='list'>
                <li>Recommendation of suitable jobs and employers</li>
                <li>Detailed listing of jobs and the accomodation available for you</li>
                <li>Simple and inituitive interface to navigate and apply for jobs</li>
              </ul>
              {/* <p>
                Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet velit faucibus semper.
                Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus egestas. Enim sit aliquam nec, a. Morbi enim
                fermentum lacus in. Viverra.
              </p> */}
              {/* <h3>How we helped</h3>
              <p>
                Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam. Montes, magna cursus nulla
                feugiat dignissim id lobortis amet. Laoreet sem est phasellus eu proin massa, lectus. Diam rutrum posuere donec ultricies
                non morbi. Mi a platea auctor mi.
              </p>
              <p>
                Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque.
                Blandit amet, sed aenean erat arcu morbi.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
