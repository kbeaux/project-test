import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

interface JobListProps {
  jobs: Job[];
  selectedJob: number | null;
  onSelectJob: (id: number) => void;
}

export function JobList({ jobs, selectedJob, onSelectJob }: JobListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      {jobs.map((job) => (
        <div
          key={job.id}
          className={cn(
            'p-6 cursor-pointer transition-colors',
            selectedJob === job.id
              ? 'bg-blue-50'
              : 'hover:bg-gray-50'
          )}
          onClick={() => onSelectJob(job.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h3>
              <div className="mt-1 space-y-1">
                <p className="text-sm text-gray-500">
                  {job.department} · {job.location} · {job.type}
                </p>
              </div>
            </div>
            <ChevronRight
              className={cn(
                'h-5 w-5 text-gray-400 transition-transform',
                selectedJob === job.id && 'transform rotate-90'
              )}
            />
          </div>

          {selectedJob === job.id && (
            <div className="mt-4 space-y-4">
              <p className="text-gray-600">{job.description}</p>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}