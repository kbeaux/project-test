import { Search } from 'lucide-react';

export function Home() {
  return (
    <div className="relative">
      {/* Hero Video Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2940&auto=format&fit=crop"
        >
          <source
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eba0aa30f52a7a3577af8969f4fc36461cd14&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Search Widget */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col">
              {/* Tabs */}
              <div className="flex border-b">
                <button className="flex-1 px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50 border-r border-gray-200 hover:bg-gray-100">
                  Business Transfer & Lease
                </button>
                <button className="flex-1 px-6 py-4 text-sm font-medium text-gray-500 border-r border-gray-200 hover:bg-gray-50">
                  Retail Walls
                </button>
                <button className="flex-1 px-6 py-4 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Office Space
                </button>
              </div>
              
              {/* Search Form */}
              <div className="p-6">
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      placeholder="City or Postal Code"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="surface" className="block text-sm font-medium text-gray-700">
                      Surface (m²)
                    </label>
                    <div className="mt-1 flex space-x-2">
                      <input
                        type="number"
                        id="surface-min"
                        placeholder="Min"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      <input
                        type="number"
                        id="surface-max"
                        placeholder="Max"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                      Budget (€)
                    </label>
                    <div className="mt-1 flex space-x-2">
                      <input
                        type="number"
                        id="budget-min"
                        placeholder="Min"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      <input
                        type="number"
                        id="budget-max"
                        placeholder="Max"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search Properties
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`https://images.unsplash.com/photo-${[
                    '1497366754035-f200968a6e72',
                    '1497366811353-6870744d04b2',
                    '1497366216602-715c5ce5d907',
                    '1497366412874-3e1e35a63f9a',
                    '1497366858526-0766af68c9c1',
                    '1497366982554-0ac49a4c3f0f',
                    '1497366917201-2d066d87a29c',
                    '1497366754035-f200968a6e72'
                  ][i]}?auto=format&fit=crop&w=800&q=80`}
                  alt={`Property ${i + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Commercial Space {i + 1}</h3>
                <p className="text-sm text-gray-600 mb-2">Paris {(75001 + i).toString()}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">€{(1500 + i * 200).toLocaleString()}/month</span>
                  <span className="text-sm text-gray-500">{(50 + i * 10)}m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Sections */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sell Your Property',
                description: 'Get a free valuation and expert advice',
                buttonText: 'Start Selling',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Property Valuation',
                description: 'Know the true value of your property',
                buttonText: 'Get Estimate',
                image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Investment Opportunities',
                description: 'Discover prime investment properties',
                buttonText: 'Invest Now',
                image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=800&q=80'
              }
            ].map((cta, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={cta.image}
                  alt={cta.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/0" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{cta.title}</h3>
                  <p className="text-gray-200 mb-4">{cta.description}</p>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
                    {cta.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}