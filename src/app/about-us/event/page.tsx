import { Mountain, Calendar, Users, Flag, MapPin, Clock } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="py-24 bg-gradient-to-b from-orange-50 to-white   mt-[55px]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-6xl font-bold mb-6 text-gray-800">
            Everest Independence Trek
          </h2>
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-orange-600 font-semibold">
              <Flag className="w-5 h-5" />
              <span>Special Independence Day Event</span>
            </div>
          </div>

          <div className="relative mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full">
                <Mountain className="w-6 h-6" />
              </div>
            </div>
          </div>

          <p className="text-3xl font-light italic text-gray-700 mb-12 leading-relaxed">
            "Celebrate India's spirit of freedom at the top of the world. Join
            our exclusive Everest Base Camp trek on the auspicious occasion of
            Independence Day."
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-lg mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Event Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Date</p>
                      <p className="text-gray-600">August 15, 2025</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Location</p>
                      <p className="text-gray-600">Everest Base Camp, Nepal</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Duration</p>
                      <p className="text-gray-600">12 Days Trek Package</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Registration
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Limited Spots
                      </p>
                      <p className="text-gray-600">Only 500 participants</p>
                    </div>
                  </div>

                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-orange-600 h-2.5 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm text-gray-500">75% spots filled</p>
                  </div>

                  <button className="mt-4 w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-3 px-6 rounded-sm font-bold hover:from-orange-600 hover:to-orange-800 transition duration-300">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 mt-16">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mountain className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-gray-700">5,364m Altitude</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Flag className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-gray-700">Flag Hoisting Ceremony</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-gray-700">Indian Trekkers Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
