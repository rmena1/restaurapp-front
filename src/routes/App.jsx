import Table from "../components/Table";
import { useState, useEffect } from "react";
import DateRangeCalendar from "../components/DateRangeCalendar";

function App() {
    const [data, setData] = useState([]);
    const backend_url = process.env.REACT_APP_BACK_URL;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    // Get info between selected dates from backend
    useEffect(() => {
        if (startDate && endDate) {
            const start = String(startDate.getFullYear()) + '-' + String(('0' + (startDate.getMonth() + 1)).slice(-2)) + '-' + String(('0' + (startDate.getDate())).slice(-2));
            const end = String(endDate.getFullYear()) + '-' + String(('0' + (endDate.getMonth() + 1)).slice(-2)) + '-' + String(('0' + (endDate.getDate())).slice(-2));
            fetch(`${backend_url}/get_by_date/${start}/${end}`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    if (data.length === 0) {
                        alert("No hay datos para el rango seleccionado. Por favor elija otras fechas.");
                    }
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
                <DateRangeCalendar startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
            </div>
            <Table rowsPerPage={50} data={data.slice(0, 1000)}/>
        </>
    );
}

export default App;
