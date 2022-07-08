import Table from "../components/Table";
import { useState, useEffect } from "react";
import DateRangeCalendar from "../components/DateRangeCalendar";
import { useNavigate } from "react-router-dom";

function App() {
    const [data, setData] = useState([]);
    const backend_url = process.env.REACT_APP_BACK_URL;
    const [startDate, setStartDate] = useState(new Date("2018-01-01"));
    const [endDate, setEndDate] = useState(new Date());
    const [first_render, setFirstRender] = useState(true);
    const navigate = useNavigate();

    const handle_report_navigate = () => {
        const start = String(startDate.getFullYear()) + '-' + String(('0' + (startDate.getMonth() + 1)).slice(-2)) + '-' + String(('0' + (startDate.getDate())).slice(-2));
        const end = String(endDate.getFullYear()) + '-' + String(('0' + (endDate.getMonth() + 1)).slice(-2)) + '-' + String(('0' + (endDate.getDate())).slice(-2));
        navigate(`/report/${start}/${end}`);
    }

    // Get data between selected dates from backend
    useEffect(() => {
        if (startDate && endDate && !first_render) {
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
        }else{
            setFirstRender(false);
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
            <div className='flex'>
                <div className='mx-auto w-max h-auto pt-10 pb-5'>
                    <DateRangeCalendar startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
                </div>
                <div className='mx-auto w-max h-auto pt-10 pb-5 ml-0 my-auto'>
                    <div className='mx-auto'>
                        <button className={'bg-sky-800 hover:bg-sky-700 text-white font-bold py-5 px-10 rounded'} onClick={() => handle_report_navigate()}>Generar Reporte</button>
                    </div>
                </div>
            </div>
            
            <div className="mb-10">
                <Table rowsPerPage={50} data={data.slice(0, 1000)}/>
            </div>
        </>
    );
}

export default App;
