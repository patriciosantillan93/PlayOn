import React, { useState, useEffect } from 'react';

const DateSelector: React.FC = () => {
  const [dates, setDates] = useState<Date[]>([]); // Placeholder for fetched dates

  useEffect(() => {
    // Mock function to fetch dates from the database
    const fetchDates = async () => {
      // Replace this with your actual fetch logic
      const fetchedDates = [
        new Date(),
        new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      ];
      setDates(fetchedDates);
    };

    fetchDates();
  }, []);

  return (
    <div className="date-selector">
      {dates.length > 0 ? (
        dates.map((date, index) => {
          const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          return (
            <div key={index} className="date-button">
              {dateString}
            </div>
          );
        })
      ) : (
        <div>Loading dates...</div> // Placeholder text while fetching
      )}
    </div>
  );
};

export default DateSelector;
