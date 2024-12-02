import { useState } from "react";
import { submitProperty, PropertySubmission } from "@/lib/api/sell";

export function useSellProperty() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: PropertySubmission) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await submitProperty(data);
      setSuccess(true);
    } catch (err) {
      setError("Failed to submit property. Please try again.");
      console.error("Property submission error:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
    error,
    success,
    reset: () => {
      setError(null);
      setSuccess(false);
    },
  };
}
