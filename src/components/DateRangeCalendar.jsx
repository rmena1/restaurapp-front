import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeCalendar = ({ startDate, endDate, setStartDate, setEndDate }) => {
    
    const years = [];
    // add years from 2018 to current year to the array
    for (let i = 2010; i <= new Date().getFullYear(); i++) {
        years.push(i);
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start)
        setEndDate(end)
    };

    return (
        <DatePicker
            renderCustomHeader={({
                date,
                changeYear,
                monthDate,
                customHeaderCount,
                decreaseMonth,
                increaseMonth,
            }) => (
                <div>
                <button
                    aria-label="Previous Month"
                    className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                    }
                    style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                    onClick={decreaseMonth}
                >
                    <span
                    className={
                        "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                    >
                    {"<"}
                    </span>
                </button>
                <span className="react-datepicker__current-month">
                    {monthDate.toLocaleString("en-US", {
                    month: "long",
                    })}
                </span>
                <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}>
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                <button
                    aria-label="Next Month"
                    className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                    }
                    style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
                    onClick={increaseMonth}
                >
                    <span
                    className={
                        "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                    >
                    {">"}
                    </span>
                </button>
                </div>
            )}
            monthsShown={2}
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
        />
    )
}

export default DateRangeCalendar
