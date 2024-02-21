
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
    
    <div className="flex  items-center my-2 space-x-2 ">
      <label htmlFor="datePicker" className=" text-white border-0 rounded-md p-2 bg-green-400 bold select-none ">
        Дата на събитието
      </label>
      <div className="absolute">
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          autoComplete="off"
          className="border-0 py-3 w-44 ml-36  bg-white dark:bg-[#011E2B] rounded-md relative right-[169px] -z-10 text-black text-opacity-0 select-none dark:text-white"
        />
      </div>
    </div>
  );
};

export default DateInput;
