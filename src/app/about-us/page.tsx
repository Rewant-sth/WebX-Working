import { Icon } from "@iconify/react/dist/iconify.js"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
const values = [
  {
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 1024 1024">
        <path fill="currentColor" d="M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110l312 110z"></path>
        <path fill="currentColor" d="M378.4 475.1a35.91 35.91 0 0 0-50.9 0a35.91 35.91 0 0 0 0 50.9l129.4 129.4l2.1 2.1a33.98 33.98 0 0 0 48.1 0L730.6 434a33.98 33.98 0 0 0 0-48.1l-2.8-2.8a33.98 33.98 0 0 0-48.1 0L483 579.7z"></path>
      </svg>,
    title: "Safety First",
    desc: "Your safety is our top priority. We maintain the highest safety standards with certified guides, quality equipment, and comprehensive emergency protocols for every expedition."
  },
  {
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.24l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
          <path fill="currentColor" fillRule="nonzero" d="M6.72 16.64a1 1 0 0 1 .56 1.92c-.5.146-.86.3-1.091.44c.238.143.614.303 1.136.452C8.48 19.782 10.133 20 12 20s3.52-.218 4.675-.548c.523-.149.898-.309 1.136-.452c-.23-.14-.59-.294-1.09-.44a1 1 0 0 1 .559-1.92c.668.195 1.28.445 1.75.766c.435.299.97.82.97 1.594c0 .783-.548 1.308-.99 1.607c-.478.322-1.103.573-1.786.768C15.846 21.77 14 22 12 22s-3.846-.23-5.224-.625c-.683-.195-1.308-.446-1.786-.768c-.442-.3-.99-.824-.99-1.607c0-.774.535-1.295.97-1.594c.47-.321 1.082-.571 1.75-.766M12 2a7.5 7.5 0 0 1 7.5 7.5c0 2.568-1.4 4.656-2.85 6.14a16.4 16.4 0 0 1-1.853 1.615c-.594.446-1.952 1.282-1.952 1.282a1.71 1.71 0 0 1-1.69 0a21 21 0 0 1-1.952-1.282A16 16 0 0 1 7.35 15.64C5.9 14.156 4.5 12.068 4.5 9.5A7.5 7.5 0 0 1 12 2m0 2a5.5 5.5 0 0 0-5.5 5.5c0 1.816.996 3.428 2.28 4.74c.966.988 2.03 1.74 2.767 2.202l.453.274l.453-.274c.736-.462 1.801-1.214 2.767-2.201c1.284-1.313 2.28-2.924 2.28-4.741A5.5 5.5 0 0 0 12 4m0 2.5a3 3 0 1 1 0 6a3 3 0 0 1 0-6m0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2"></path></g></svg>,
    title: "Local Expertise",
    desc: "Our team consists of experienced local guides and Sherpas with deep knowledge of the Himalayas, ensuring authentic cultural experiences and unmatched mountain expertise."
  },
  {
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79M10 12h4m-2-2v4"></path></svg>,
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

      <section className="py-16">
        <p className="text-5xl font-semibold max-w-7xl mx-auto text-center leading-snug">Lorem ipsum dolor, sit amet <span className="text-orange-500 font-extrabold">consectetur adipisicing</span> elit. Harum <span className="px-3 pb-2 border rounded-full">Himalaya</span> facilis ullam quis id ipsa <u>unde dolorem</u> dignissimos cupiditate deserunt. Quia quasi ipsam tempora corrupti, ipsa mollitia <span className="h-16 w-40 rounded-full inline-flex translate-y-4 bg-amber-300 overflow-hidden"><img src="/EXPEDITION/DSC00695.jpg" alt="" className="h-full w-full object-cover" /></span> cupiditate delectus </p>
      </section>

      <section className="grid p-6 pb-10 grid-cols-7 gap-6 h-[85dvh]">
        <div className="col-span-5 relative rounded-sm overflow-hidden h-full ">
          <Image src={"/EVEREST REGION/NIKON D80013076.jpg"} fill alt="Everest Region" className="object-cover " />
          <div className="absolute inset-0 z-[99] flex flex-col justify-between  bg-black/20">
            <div className="p-6 text-white">
              <h3 className="text-lg font-semibold">Connect with us</h3>
              <p className="flex gap-4 mt-3 items-center">
                <Icon className="text-2xl" icon={"cib:facebook"} />
                <Icon className="text-2xl" icon={"cib:twitter"} />
                <Icon className="text-2xl" icon={"cib:instagram"} />
                <Icon className="text-2xl" icon={"iconoir:tiktok-solid"} />
              </p>
            </div>

            <div className="p-6 text-white">
              <div className="mb-10 border-b pb-2 max-w-sm">
                <p className="text-xl flex gap-2 items-end">Experience the breathtaking beauty of the </p>
                <p className="pb-2 text-xl flex gap-2 items-end">Himalayas with our expert guides. <span className="bg-white size-8 shrink-0 rounded-full text-orange-500 flex justify-center items-center"><ArrowUpRight /></span></p>
              </div>

              <h3 className="text-5xl max-w-3xl font-semibold">Your journey to the roof of the world begins with us</h3>
            </div>
          </div>
        </div>
        <div className="col-span-2 grid grid-rows-2   ">
          <div className="h-full w-full relative rounded-sm overflow-hidden">
            <Image src={"/EXPEDITION/DSC00695.jpg"} fill alt="Everest Region" className="object-cover" />
          </div>
          <div className="py-6">
            <h2 className="text-2xl font-semibold mb-2">Meet Our Founder</h2>
            <p>Raj Thapa, a seasoned mountaineer with 15+ years of Himalayan experience, founded High Five Adventures to share his passion for Nepal's majestic peaks with the world.</p>

            <h2 className="font-semibold mt-6">Our Specialities</h2>
            <div className="flex gap-3 mt-2 items-center flex-wrap">
              <span className="bg-gray-200 px-2 py-0.5 rounded-sm">Peak Climbing</span>
              <span className="bg-gray-200 px-2 py-0.5 rounded-sm">Expeditions</span>
              <span className="bg-gray-200 px-2 py-0.5 rounded-sm">Trekking</span>
              <span className="bg-gray-200 px-2 py-0.5 rounded-sm">City Tours</span>
              <span className="bg-gray-200 px-2 py-0.5 rounded-sm">Cultural Experiences</span>
            </div>
          </div>
        </div>
      </section>



      <div className="p-6 py-10">
        <div className=" p-8 grid grid-cols-4 gap-10 bg-gray-100">
          <div className="col-span-2 h-full w-full  rounded-sm   leading-snug">
            <h2 className="text-5xl font-semibold">Our Core Principal Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, sed.</h2>
            <p className="mt-10 text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis inventore saepe eum enim totam nihil animi quibusdam iusto. Natus nobis, error ut quae quidem quam dolorum molestias optio dicta cupiditate.</p>
          </div>
          <div className="col-span-2 gap-4 grid grid-rows-3">
            {values?.slice(0, 3).map((item, idx) => (
              <div className="flex relative  bg-white inset-shadow-sm inset-shadow-gray-300 hover:inset-shadow-2xs p-8 text- items-center gap-4 rounded-sm overflow-hidden " key={idx}>
                <div className="relative bg-gradient-to-b  ">
                  <div>
                    <h4 className="text-2xl mb-3 font-semibold uppercase flex gap-2 items-center">{item.icon} {item.title}</h4>
                    <p className="mt-1 text-lg ">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>




    </main>
  )
}