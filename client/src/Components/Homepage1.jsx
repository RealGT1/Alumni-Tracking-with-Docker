import React from 'react';

const MyComponent = () => {
    return (
        <div className='' >

            <div className="font-sans flex flex-col min-h-screen w-full ">

                {/* Main Content Section */}
                <div className="bg-gray-200 md:overflow-hidden">
                    <div className="px-4 py-16">
                        {/* Main Content */}
                        <div className="relative w-full md:max-w-2xl md:mx-auto text-center">
                            <h1 className="font-bold text-gray-700 text-xl sm:text-2xl md:text-5xl leading-tight mb-6 fade-in">Alumni-Connect</h1>
                            <p className="text-gray-600 md:text-2xl font-semibold md:px-18 fade-inn">Engage with your alumni through one streamlined platform.</p>
                            {/* Background Circles */}
                            <div className="hidden md:block h-40 w-40 rounded-full bg-blue-800 absolute right-0 bottom-9 -mb-64 -mr-48 "></div>
                            <div className="hidden md:block h-5 w-5 rounded-full bg-yellow-500 absolute top-0 right-0 -mr-40 mt-32"></div>
                        </div>
                    </div>

                    {/* SVG Background */}
                    <svg className="fill-current bg-gray-200 text-white hidden md:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fillOpacity="1" d="M0,64L120,85.3C240,107,480,149,720,149.3C960,149,1200,107,1320,85.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
                    </svg>
                </div>

                {/* Additional Content Section */}
                <div className="max-w-4xl mx-auto bg-white shadow-lg relative z-20 hidden md:block" style={{ marginTop: '-320px', borderRadius: '20px' }}>
                    {/* Circle Overlays */}
                    <div className="h-20 w-20 rounded-full bg-yellow-500 absolute top-0 left-0 -ml-10 -mt-10" style={{ zIndex: '-1' }}></div>
                    <div className="h-5 w-5 rounded-full bg-blue-500 absolute top-0 left-0 -ml-32 mt-12" style={{ zIndex: '-1' }}></div>
                    {/* Content */}
                    <div className="h-10 bg-white rounded-t-lg border-b border-gray-100"></div>
                    {/* Rest of the content here */}
                </div>


            </div>
            <div className=' absolute top-3/4 left-1/4 animate-infinite-scroll whitespace-nowrap flex items-center '>
                <p className='font-serif text-9xl font-bold text-gray-500 mr-8'>INFORMATION SCIENCE AND ENGINEERING </p>
                {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>*/}


            </div>

        </div>
    );
};

export default MyComponent;
