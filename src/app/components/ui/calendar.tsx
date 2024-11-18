import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';
import "react-day-picker/style.css";


function Calendar(selected) {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
