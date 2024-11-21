import * as React from "react";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/style.css";

function Calendar(selectedDate: Date) {
  const [selected, setSelected] = useState<Date>();

  return <DayPicker mode="single" selected={selected} onSelect={setSelected} />;
}

Calendar.displayName = "Calendar";

export { Calendar };
