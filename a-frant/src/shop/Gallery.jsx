import React from 'react'

const Gallery = () => {
  return (
    <div>
         {/* Gallery / Carousel Section */}
                <div className="bg-white dark:bg-gray-800 py-2 sm:py-4xlg:py-4">
                  <div className="mx-auto max-w-screen-2xl px-2 md:px-3">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">Gallery</h2>
                        <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
                          Discover our featured watches and latest models with cutting-edge technology and design.
                        </p>
                      </div>
                      <a
                        href="#"
                        className="inline-block rounded-lg border bg-white dark:bg-gray-700 dark:border-none px-4 py-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-200 transition duration-100 hover:bg-gray-100 focus-visible:ring md:px-8 md:py-3 md:text-base"
                      >
                        More
                      </a>
                    </div>
        
                    {/* Image Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
                      {[
                        {
                          src: "https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=1000",
                          label: "rollex"
                        },
                        {
                          src: "https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=1000",
                          label: "Tech"
                        },
                        {
                          src: "https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000",
                          label: "Dev"
                        },
                        {
                          src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600",
                          label: "Retro"
                        }
                      ].map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${
                            index === 1 || index === 2 ? "md:col-span-2" : ""
                          } md:h-80`}
                        >
                          <img
                            src={item.src}
                            loading="lazy"
                            alt={item.label}
                            className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
                          <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                            {item.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
    </div>
  )
}

export default Gallery