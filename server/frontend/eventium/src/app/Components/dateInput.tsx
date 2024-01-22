
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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
    <div className="flex items-center space-x-2 ml-3">
      <label htmlFor="datePicker" className="text-white bold select-none">
        Дата на събитието
      </label>
      <div className="relative">
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          autoComplete="off"
          className="border py-3 w-44 bg-green-500 rounded-md relative right-[169px]  -z-10 text-white text-opacity-0 select-none "
         
        />
       
      </div>
    </div>
  );
};

export default DateInput;
