import Table from "../components/Table";
import { useState, useEffect } from "react";

function App() {
    const [data, setData] = useState([]);
    const backend_url = process.env.REACT_APP_BACK_URL;

    // get data from API
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
    }, []);
    

    return (
        <>
            <div className='h-20'/>
            <Table rowsPerPage={50} data={data.slice(0, 1000)}/>
        </>
    );
}

export default App;
