
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

interface DateInputProps {
  onDateChange: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date as Date);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="datePicker" className="text-gray-700">Дата на събитието</label>
      <DatePicker
        id="datePicker"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        className="border border-gray-300 p-2 rounded-md"
      />
    </div>
  );
};

export default DateInput;
