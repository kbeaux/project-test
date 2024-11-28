import { Building2, Mail, Phone } from 'lucide-react';

const agents = [
  {
    name: 'Sophie Martin',
    title: 'Senior Commercial Agent',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    email: 'sophie.martin@realestatepro.com',
    phone: '+33 1 23 45 67 89',
    specialties: ['Retail', 'Office Space'],
  },
  {
    name: 'Thomas Bernard',
    title: 'Investment Specialist',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    email: 'thomas.bernard@realestatepro.com',
    phone: '+33 1 23 45 67 90',
    specialties: ['Commercial', 'Investment'],
  },
  {
    name: 'Marie Dubois',
    title: 'Business Transfer Expert',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    email: 'marie.dubois@realestatepro.com',
    phone: '+33 1 23 45 67 91',
    specialties: ['Business Transfer', 'Commercial Lease'],
  },
];

export function FeaturedAgents() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Experts</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our team of experienced professionals is here to help you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {agent.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">{agent.title}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2" />
                    <a
                      href={`mailto:${agent.email}`}
                      className="hover:text-blue-600"
                    >
                      {agent.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    <a
                      href={`tel:${agent.phone}`}
                      className="hover:text-blue-600"
                    >
                      {agent.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-5 w-5 mr-2" />
                    <span>{agent.specialties.join(' • ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}