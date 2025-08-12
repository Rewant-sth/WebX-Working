import Link from "next/link"
const values = [
  {
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110l312 110z"></path><path fill="currentColor" d="M378.4 475.1a35.91 35.91 0 0 0-50.9 0a35.91 35.91 0 0 0 0 50.9l129.4 129.4l2.1 2.1a33.98 33.98 0 0 0 48.1 0L730.6 434a33.98 33.98 0 0 0 0-48.1l-2.8-2.8a33.98 33.98 0 0 0-48.1 0L483 579.7z"></path></svg>,
    title: "Safety First",
    desc: "Your safety is our top priority. We maintain the highest safety standards with certified guides, quality equipment, and comprehensive emergency protocols for every expedition."
  },
  {
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" fillRule="nonzero" d="M6.72 16.64a1 1 0 0 1 .56 1.92c-.5.146-.86.3-1.091.44c.238.143.614.303 1.136.452C8.48 19.782 10.133 20 12 20s3.52-.218 4.675-.548c.523-.149.898-.309 1.136-.452c-.23-.14-.59-.294-1.09-.44a1 1 0 0 1 .559-1.92c.668.195 1.28.445 1.75.766c.435.299.97.82.97 1.594c0 .783-.548 1.308-.99 1.607c-.478.322-1.103.573-1.786.768C15.846 21.77 14 22 12 22s-3.846-.23-5.224-.625c-.683-.195-1.308-.446-1.786-.768c-.442-.3-.99-.824-.99-1.607c0-.774.535-1.295.97-1.594c.47-.321 1.082-.571 1.75-.766M12 2a7.5 7.5 0 0 1 7.5 7.5c0 2.568-1.4 4.656-2.85 6.14a16.4 16.4 0 0 1-1.853 1.615c-.594.446-1.952 1.282-1.952 1.282a1.71 1.71 0 0 1-1.69 0a21 21 0 0 1-1.952-1.282A16 16 0 0 1 7.35 15.64C5.9 14.156 4.5 12.068 4.5 9.5A7.5 7.5 0 0 1 12 2m0 2a5.5 5.5 0 0 0-5.5 5.5c0 1.816.996 3.428 2.28 4.74c.966.988 2.03 1.74 2.767 2.202l.453.274l.453-.274c.736-.462 1.801-1.214 2.767-2.201c1.284-1.313 2.28-2.924 2.28-4.741A5.5 5.5 0 0 0 12 4m0 2.5a3 3 0 1 1 0 6a3 3 0 0 1 0-6m0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2"></path></g></svg>,
    title: "Local Expertise",
    desc: "Our team consists of experienced local guides and Sherpas with deep knowledge of the Himalayas, ensuring authentic cultural experiences and unmatched mountain expertise."
  },
  {
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79M10 12h4m-2-2v4"></path></svg>,
    title: "Sustainable Tourism",
    desc: "We are committed to responsible tourism practices that preserve the natural environment and support local communities for future generations to enjoy."
  },
  {
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={4}><path d="M24 30c6.627 0 12-5.53 12-12.353V4H12v13.647C12 24.47 17.373 30 24 30Z"></path><path strokeLinecap="round" d="M12 21V11H4c0 6.667 4 10 8 10m24 0V11h8c0 6.667-4 10-8 10" clipRule="evenodd"></path><path strokeLinecap="round" d="M24 32v4"></path><path d="m15 42l3.69-6h10.353L33 42z"></path></g></svg>,
    title: "Excellence",
    desc: "We strive for excellence in every aspect of our service, from personalized itineraries to world-class equipment, ensuring your adventure exceeds expectations."
  },
]

export default function AboutUsPage() {



  return (
    <main >
      <section className="py-28 px-4 sm:px-6 md:px-8 lg:px-20">
        <div className=" mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex ">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h1 className="text-sm text-indigo-600 font-medium">
              Over 2000+ successful adventures
            </h1>
            <h2 className="text-4xl text-gray-800 font-bold md:text-5xl">
              We transform dreams into Himalayan adventures
            </h2>
            <p>
              Since 2016, High Five Adventures has been Nepal's premier trekking and mountaineering company, guiding adventurers through the world's most spectacular mountain landscapes with unmatched expertise and authentic local knowledge.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <Link href="/package-list/expedition" className="block py-3 px-5 text-center text-white font-medium bg-blue-500 duration-150 hover:bg-blue-600 active:bg-blue-700 rounded-sm  hover:shadow-none">
                Start Your Adventure
              </Link>
              <Link href="/package-list/trekking" className="flex items-center justify-center gap-x-2 py-3 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-sm md:inline-flex">
                Explore Packages
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex-none group mt-14 md:mt-0 md:max-w-xl">
            <img
              src="/Hero.jpg"
              className="group-hover:rounded-tl-[0px] group-hover:rounded-br-[0px] group-hover:rounded-tr-[108px] group-hover:rounded-bl-[108px] transition-all duration-500 md:rounded-tl-[108px] md:rounded-br-[108px]"
              alt="Himalayan Mountain Adventure"
            />
          </div>
        </div>
      </section>

      <section className="py-12 relative px-4 sm:px-6 md:px-8 lg:px-20">
        <div className="relative z-10  mx-auto  text-gray-700 justify-between gap-24 lg:flex ">
          <div className="max-w-xl">
            <h3 className="text-black text-3xl font-bold sm:text-4xl">
              Our Core Values
            </h3>
            <p className="mt-3">
              These fundamental principles guide every expedition we lead and reflect our commitment to delivering exceptional Himalayan adventures while respecting the mountains and communities we serve.
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <ul className="grid gap-2 sm:grid-cols-2">
              {
                values.map((item, idx) => (
                  <li key={idx} className="flex flex-col gap-4 group cursor-pointer hover:bg-blue-500 transition-all duration-300 p-4 rounded-2xl">
                    <div className="flex-none w-12 h-12 bg-blue-500 group-hover:bg-white group-hover:text-blue-500 text-white rounded-sm flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg text-gray-800 group-hover:text-gray-100 font-semibold">
                        {item.title}
                      </h4>
                      <p className="mt-3 group-hover:text-gray-100">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="lg:flex justify-between gap-24 mx-auto px-4 sm:px-6 md:px-8 lg:px-20">
          <div className="text- mb-16 max-w-lg">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                At High Five Adventures, our mission is to make the majestic Himalayas accessible to adventurers from around the world while preserving the pristine beauty and cultural heritage of Nepal. We believe that mountains have the power to transform lives, build character, and create lasting memories.
              </p>
              {/* <p className="text-lg text-gray-700 leading-relaxed">
                Through our expertly crafted expeditions, we aim to provide safe, authentic, and sustainable adventure experiences that not only challenge and inspire our clients but also contribute positively to the local communities and environment we operate in.
              </p> */}
            </div>
          </div>

          <div className="grid md:grid-cols-2 w-full gap-2">
            <div className="w-full p-4 group cursor-pointer hover:bg-blue-500 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-blue-600 rounded-full flex items-center justify-center  mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.48em" height="2.2em" viewBox="0 0 576 512"><path fill="currentColor" d="M352 264V64c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v200c0 13.3-10.7 24-24 24s-24-10.7-24-24V78.1C90 109.8 32 191.8 32 288v64h512v-64c-1-95.2-58.4-177.7-144-209.8V264c0 13.3-10.7 24-24 24s-24-10.7-24-24M40 400c-22.1 0-40 17.9-40 40s17.9 40 40 40h496c22.1 0 40-17.9 40-40s-17.9-40-40-40z"></path></svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 group-hover:text-gray-100 mb-3">Safe Adventures</h4>
              <p className="text-gray-600 group-hover:text-gray-200">Every expedition is meticulously planned with safety as our paramount concern.</p>
            </div>

            <div className="w-full p-4 group cursor-pointer hover:bg-blue-500 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-blue-600 rounded-full flex items-center justify-center mx- mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 21c-41 0-82 6.9-115.1 20.34c-33 13.38-57.7 33.05-68.48 57.92C57.64 144.1 61.7 219.2 83.55 291.8C105.5 364.7 145 435.1 197.3 472.7c30.6 22.1 86.8 22.1 117.4 0c52.3-37.6 91.8-108 113.7-180.9c21.9-72.6 26-147.7 11.2-192.54c-10.8-24.87-35.5-44.54-68.5-57.92C338 27.9 297 21 256 21m0 18c13.7 0 25 11.3 25 25s-11.3 25-25 25s-25-11.3-25-25s11.3-25 25-25m-76 28c13.7 0 25 11.3 25 25s-11.3 25-25 25s-25-11.3-25-25s11.3-25 25-25m152 0c13.7 0 25 11.3 25 25s-11.3 25-25 25s-25-11.3-25-25s11.3-25 25-25m-220 36c13.7 0 25 11.3 25 25s-11.3 25-25 25s-25-11.3-25-25s11.3-25 25-25m288 0c13.7 0 25 11.3 25 25s-11.3 25-25 25s-25-11.3-25-25s11.3-25 25-25m-185.6 34.6l41.6 41.7l41.6-41.7l12.8 12.8l-54.4 54.3l-54.4-54.3zm-55 54.1h2.8c6.4.1 13.2 1.3 20.1 3.8c15.8 5.8 32 18 48.7 38.9l4.1 5.1l-3.6 5.5C214 271.3 187 285 160 285s-54-13.7-71.49-40l-4.09-6.1l5.22-5.3c6.94-6.9 24.06-28.9 49.26-38.1c6.3-2.3 13.2-3.7 20.5-3.8m190.4 0h2.8c7.3.1 14.2 1.5 20.5 3.8c25.2 9.2 42.3 31.2 49.3 38.1l5.2 5.3l-4.1 6.1C406 271.3 379 285 352 285s-54-13.7-71.5-40l-3.6-5.5l4.1-5.1c16.7-20.9 32.9-33.1 48.7-38.9c6.9-2.5 13.7-3.7 20.1-3.8m-190.1 17.9c-5.1.1-9.9 1.2-14.6 2.9c-15.6 5.6-28.2 18.7-37.3 28.2C122 258.4 141 267 160 267c19.1 0 38.2-8.6 52.4-26.5c-13.4-15.5-25.7-24.2-36.2-28c-5.9-2.2-11.3-3-16.5-2.9m192.6 0c-5.2-.1-10.6.7-16.5 2.9c-10.5 3.8-22.8 12.5-36.2 28c14.2 17.9 33.3 26.5 52.4 26.5c19 0 38-8.6 52.2-26.3c-9.1-9.5-21.7-22.6-37.3-28.2c-4.7-1.7-9.5-2.8-14.6-2.9M247 240h18l7 112c0 16-32 16-32 0zM61.29 279.1c-14.18 1.2-25.75 11.8-33.44 25.6C19.67 319.4 15 338.8 15 360s4.67 40.6 12.85 55.3S48.58 441 64 441s27.97-11 36.2-25.7c3.2-5.8 5.9-12.4 8-19.6c-4.8-8.3-9.36-16.9-13.62-25.7c-1.22 14.4-5.02 27.3-10.16 36.5C78.12 417.9 70.67 423 64 423s-14.12-5.1-20.42-16.5C37.29 395.2 33 378.5 33 360s4.29-35.2 10.58-46.5C49.88 302.1 57.33 297 64 297c.79 0 1.58.1 2.39.2c-.02-.1-.05-.1-.07-.2c-1.79-6-3.46-11.9-5.03-17.9m389.41 0c-1.5 6-3.2 11.9-5 17.9c0 .1 0 .1-.1.2c.8-.1 1.6-.2 2.4-.2c6.7 0 14.1 5.1 20.4 16.5c6.3 11.3 10.6 28 10.6 46.5s-4.3 35.2-10.6 46.5c-6.3 11.4-13.7 16.5-20.4 16.5s-14.1-5.1-20.4-16.5c-5.1-9.2-9-22-10.2-36.5c-4.2 8.8-8.8 17.4-13.5 25.7c2 7.2 4.7 13.8 7.9 19.6C420 430 432.6 441 448 441s28-11 36.2-25.7c8.1-14.7 12.8-34.1 12.8-55.3s-4.7-40.6-12.8-55.3c-7.7-13.8-19.3-24.4-33.5-25.6m-233.1 2.5l12.8 12.8c-9.1 9-25.3 21.1-44 31.5S147 345 128 345v-18c13 0 32.3-7.3 49.6-16.9s33.1-21.5 40-28.5m76.8 0c6.9 7 22.7 18.9 40 28.5S371 327 384 327v18c-19 0-39.7-8.7-58.4-19.1s-34.9-22.5-44-31.5zm-76.8 48l12.8 12.8c-9.1 9-21.7 17.3-34.4 23.7c-12.7 6.3-25 10.9-36 10.9v-18c5 0 16.7-3.4 28-9.1c11.3-5.6 22.7-13.3 29.6-20.3m76.8 0c6.9 7 18.3 14.7 29.6 20.3c11.3 5.7 23 9.1 28 9.1v18c-11 0-23.3-4.6-36-10.9c-12.7-6.4-25.3-14.7-34.4-23.7zM256 391c18.6 0 35.4 2.7 48.4 7.6c6.5 2.4 12.1 5.4 16.5 9.3c4.5 4 8.1 9.5 8.1 16.1s-3.6 12.1-8.1 16.1c-4.4 3.9-10 6.9-16.5 9.3c-13 4.9-29.8 7.6-48.4 7.6s-35.4-2.7-48.4-7.6c-6.5-2.4-12.1-5.4-16.5-9.3c-4.5-4-8.1-9.5-8.1-16.1s3.6-12.1 8.1-16.1c4.4-3.9 10-6.9 16.5-9.3c13-4.9 29.8-7.6 48.4-7.6"></path></svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-100">Authentic Experiences</h4>
              <p className="text-gray-600 group-hover:text-gray-200">Immerse yourself in genuine Himalayan culture and traditions.</p>
            </div>

            <div className="w-full p-4 group cursor-pointer hover:bg-blue-500 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-blue-600 rounded-full flex items-center justify-center mx- mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.75em" height="2.2em" viewBox="0 0 640 512"><path fill="currentColor" d="M320 0a40 40 0 1 1 0 80a40 40 0 1 1 0-80m44.7 164.3l11.1 88.7c1.6 13.2-7.7 25.1-20.8 26.8s-25.1-7.7-26.8-20.8l-4.4-35h-7.6l-4.4 35c-1.6 13.2-13.6 22.5-26.8 20.8s-22.5-13.6-20.8-26.8l11.1-88.8l-19.8 16.8c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l27.9-23.6c18.9-16 42.9-24.8 67.6-24.8s48.7 8.8 67.6 24.7l27.9 23.6c10.1 8.6 11.4 23.7 2.8 33.8s-23.7 11.4-33.8 2.8l-19.8-16.7zM40 64c22.1 0 40 17.9 40 40v160.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2l-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32l15.2 15.2l25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48h-66.7c-17 0-33.3-6.7-45.3-18.7l-99.8-99.9C10.1 375.4 0 351 0 325.5V104c0-22.1 17.9-40 40-40m560 0c22.1 0 40 17.9 40 40v221.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48v-78.9c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3l15.2-15.2l32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32l-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V104c0-22.1 17.9-40 40-40z"></path></svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-100">Community Impact</h4>
              <p className="text-gray-600 group-hover:text-gray-200">Supporting local communities and sustainable tourism practices.</p>
            </div>

            <div className="w-full p-4 group cursor-pointer hover:bg-blue-500 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 256 256"><path fill="currentColor" d="M212 76v-4a44 44 0 0 0-74.86-31.31a3.93 3.93 0 0 0-1.14 2.8v88.72a4 4 0 0 0 6.2 3.33a47.67 47.67 0 0 1 25.48-7.54a8.18 8.18 0 0 1 8.31 7.58a8 8 0 0 1-8 8.42a32 32 0 0 0-32 32v33.88a4 4 0 0 0 1.49 3.12a47.92 47.92 0 0 0 74.21-17.16a4 4 0 0 0-4.49-5.56A68 68 0 0 1 192 192h-7.73a8.18 8.18 0 0 1-8.25-7.47a8 8 0 0 1 8-8.53h8a51.6 51.6 0 0 0 24-5.88A52 52 0 0 0 212 76m-12 36h-4a36 36 0 0 1-36-36v-4a8 8 0 0 1 16 0v4a20 20 0 0 0 20 20h4a8 8 0 0 1 0 16M88 28a44.05 44.05 0 0 0-44 44v4a52 52 0 0 0-4 94.12A51.6 51.6 0 0 0 64 176h7.73a8.18 8.18 0 0 1 8.27 7.47a8 8 0 0 1-8 8.53h-8a67.5 67.5 0 0 1-15.21-1.73a4 4 0 0 0-4.5 5.55A47.93 47.93 0 0 0 118.51 213a4 4 0 0 0 1.49-3.12V176a32 32 0 0 0-32-32a8 8 0 0 1-8-8.42a8.18 8.18 0 0 1 8.32-7.58a47.67 47.67 0 0 1 25.48 7.54a4 4 0 0 0 6.2-3.33V43.49a4 4 0 0 0-1.14-2.81A43.85 43.85 0 0 0 88 28m8 48a36 36 0 0 1-36 36h-4a8 8 0 0 1 0-16h4a20 20 0 0 0 20-20v-4a8 8 0 0 1 16 0Z"></path></svg>              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-100">Personal Growth</h4>
              <p className="text-gray-600 group-hover:text-gray-200">Empowering individuals to discover their limits and achieve personal breakthroughs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-20">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Himalayan Adventure?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers who have trusted High Five Adventures to make their mountain dreams come true. Your epic journey awaits in the world's most spectacular mountain range.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/packages"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-sm hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Explore Packages
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-indigo-600 transition-colors duration-200"
            >

              Plan Your Trip
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">2000+</div>
              <div className="text-blue-200">Successful Expeditions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">8</div>
              <div className="text-blue-200">Years of Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-blue-200">Safety Record</div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white opacity-5 rounded-full"></div>
          <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-white opacity-5 rounded-full"></div>
        </div>
      </section>
    </main>
  )
}