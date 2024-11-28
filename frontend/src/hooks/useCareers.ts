import { useState } from 'react';
import { submitApplication, JobApplication } from '@/lib/api/careers';

export function useCareers() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const apply = async (application: JobApplication) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await submitApplication(application);
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error('Application error:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    apply,
    isSubmitting,
    error,
    success,
    reset: () => {
      setError(null);
      setSuccess(false);
    },
  };
}