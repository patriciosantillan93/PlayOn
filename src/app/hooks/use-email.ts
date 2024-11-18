import { useState } from 'react';

export const useSendEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async ({
    email,
    field,
    selectedDate,
    selectedTimeSlot,
  }: {
    email: string;
    field: string;
    selectedDate: any;
    selectedTimeSlot: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          field,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
        }),
      });

      if (!response.ok) {
        throw new Error('Error sending email');
      }

      const data = await response.json();
      console.log(data);

      return data;
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      throw err; // Re-throw the error for further handling in the component
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, error };
};
