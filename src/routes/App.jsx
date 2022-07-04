import Table from "../components/Table";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
    const [data, setData] = useState([]);
    const backend_url = process.env.REACT_APP_BACK_URL;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const years = [];

    // add years from 2018 to current year to the array
    for (let i = 2010; i <= new Date().getFullYear(); i++) {
        years.push(i);
    }
    
    // Set dates from calendar when the user clicks on a date
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start)
        setEndDate(end)
    };

    // Get info between selected dates from backend
    useEffect(() => {
        if (startDate && endDate) {
            const start = String(startDate.getFullYear()) + '-' + String(('0' + (startDate.getMonth() + 1)).slice(-2)) + '-' + String(('0' + (startDate.getDate())).slice(-2));
            const end = String(endDate.getFullYear()) + '-' + String(('0' + (endDate.getMonth() + 1)).slice(-2)) + '-' + String(('0' + (endDate.getDate())).slice(-2));
            fetch(`${backend_url}/get_by_date/${start}/${end}`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                })
                .catch(err => console.log(err));
        }
    }, [startDate, endDate, backend_url]);

    // get data from backend on render
    useEffect(() => {
        console.log('URL: ', backend_url);
        fetch(backend_url + "/get_all")
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => setData(data))
                } else {
                    throw new Error("Network response was not ok.");
                }
            })
            .catch(err => console.log(err));
    }, [backend_url]);
    

    return (
        <>
            <div className='mx-auto w-max h-auto pt-10 pb-5'>
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
            </div>
            <Table rowsPerPage={50} data={data.slice(0, 1000)}/>
        </>
    );
}

export default App;
