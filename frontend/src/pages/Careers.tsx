import { useState } from 'react';
import { JobList } from '@/components/careers/JobList';
import { ApplicationForm } from '@/components/careers/ApplicationForm';
import { Users, Briefcase, TrendingUp, Building } from 'lucide-react';

const benefits = [
  {
    title: 'Career Growth',
    description: 'Clear career progression paths and continuous learning opportunities',
    icon: TrendingUp,
  },
  {
    title: 'Team Environment',
    description: 'Work with passionate professionals in a collaborative setting',
    icon: Users,
  },
  {
    title: 'Premium Portfolio',
    description: 'Handle high-end commercial real estate properties',
    icon: Building,
  },
  {
    title: 'Flexible Work',
    description: 'Balance between office and remote work opportunities',
    icon: Briefcase,
  },
];

const openPositions = [
  {
    id: 1,
    title: 'Commercial Real Estate Agent',
    department: 'Sales',
    location: 'Paris',
    type: 'Full-time',
    description: 'Looking for experienced commercial real estate agents to join our growing team.',
    requirements: [
      'Minimum 3 years of commercial real estate experience',
      'Strong negotiation and communication skills',
      'Valid real estate license',
      'Fluent in French and English',
    ],
  },
  {
    id: 2,
    title: 'Property Manager',
    department: 'Operations',
    location: 'Paris',
    type: 'Full-time',
    description: 'Seeking a property manager to oversee our commercial property portfolio.',
    requirements: [
      'Previous experience in commercial property management',
      'Strong organizational and problem-solving skills',
      'Knowledge of property management software',
      'Excellent customer service skills',
    ],
  },
  {
    id: 3,
    title: 'Real Estate Market Analyst',
    department: 'Research',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our research team to analyze commercial real estate market trends.',
    requirements: [
      'Background in real estate, finance, or economics',
      'Strong analytical and research skills',
      'Proficiency in data analysis tools',
      'Experience with market research',
    ],
  },
];

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Be part of a dynamic team shaping the future of commercial real estate.
            We're always looking for talented individuals to join our growing company.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <JobList
              jobs={openPositions}
              selectedJob={selectedJob}
              onSelectJob={setSelectedJob}
            />
          </div>

          {/* Application Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Apply Now
            </h2>
            <ApplicationForm selectedJob={openPositions.find(job => job.id === selectedJob)} />
          </div>
        </div>
      </div>
    </div>
  );
}