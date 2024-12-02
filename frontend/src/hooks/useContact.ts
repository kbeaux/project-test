import { useState } from "react";
import { sendContactMessage, ContactFormData } from "@/lib/api/contact";

export function useContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await sendContactMessage(data);
      setSuccess(true);
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Contact error:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    sendMessage,
    isSubmitting,
    error,
    success,
    reset: () => {
      setError(null);
      setSuccess(false);
    },
  };
}
