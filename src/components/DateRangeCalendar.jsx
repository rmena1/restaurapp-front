import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeCalendar = () => {
    
    const years = [];
    // add years from 2018 to current year to the array
    for (let i = 2010; i <= new Date().getFullYear(); i++) {
        years.push(i);
    }

  return (
    <div>
      
    </div>
  )
}

export default DateRangeCalendar
