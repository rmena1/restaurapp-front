import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const SalesGraphs = ({ dateFrom, dateTo }) => {
    const backend_url = process.env.REACT_APP_BACK_URL;
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('Todo');
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState('Todo');
    const [dailySalesLabels, setDailySalesLabels] = useState([]);
    const [dailySalesData, setDailySalesData] = useState([]);

    // Get categories from backend
    const get_categories = async () => {
        fetch(`${backend_url}/get_category/${dateFrom}/${dateTo}`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setCategory(data[0]);
            })
            .catch(err => console.log(err));
    }

    // Get products for category from backend
    const get_products = async (category) => {
        fetch(`${backend_url}/get_products/${category}/${dateFrom}/${dateTo}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setProduct(data[0]);
            })
            .catch(err => console.log(err));
    }

    // get daily sales from backend
    const get_daily_sales = async (category, product) => {
        setDailySalesData([]);
        setDailySalesLabels([]);
        fetch(`${backend_url}/get_daily_sales/${category}/${product}/${dateFrom}/${dateTo}`)
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    setDailySalesData(dailySalesData => [...dailySalesData, data[i].sales]);
                    setDailySalesLabels(dailySalesLabels => [...dailySalesLabels, data[i].date]);
                }
            })
            .catch(err => console.log(err));
    }

    const handle_category_change = (event) => {
        setCategory(event.target.value);
        get_products(event.target.value);
        get_daily_sales(event.target.value, 'Todo');
    }

    const handle_product_change = (event) => {
        setProduct(event.target.value);
        get_daily_sales(category, event.target.value);
    }

    useEffect(() => {
        get_categories();
        get_daily_sales(category, product);
    }, [dateFrom, dateTo, backend_url]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <div className='w-full my-20'>
            <h1 className="font-medium leading-tight text-xl mt-0 text-sky-800 mb-10">Recaudación total diaria por categoría y producto</h1>
                <div className='w-2/5 mb-5 mx-auto'>
                    <label htmlFor='select_category' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>Selecciona una categoría y producto</label>
                    <select id='select-category' onChange={handle_category_change}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                        <option value='Todo'>Todo</option>
                        {categories.map((category) => {
                            return <option key={category} value={category}>{category}</option>
                        }
                        )}
                    </select>
                </div>
                <div className='w-2/5 mx-auto'>
                    <select onChange={handle_product_change}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                        <option value='Todo'>Todo</option>
                        {products.map((product) => {
                            return <option key={product} value={product}>{product}</option>
                        }
                        )}
                    </select>
                </div>
            </div>
            <div className='w-3/5 mx-auto mb-20'>
                <Line 
                    data={{
                        labels: dailySalesLabels
                        , datasets: [
                            {
                                label: 'Dataset 1'
                                , backgroundColor: 'rgba(255,99,132,0.2)'
                                , borderColor: 'rgba(255,99,132,1)'
                                , borderWidth: 1
                                , hoverBackgroundColor: 'rgba(255,99,132,0.4)'
                                , hoverBorderColor: 'rgba(255,99,132,1)'
                                , data: dailySalesData
                            }
                        ]}}
                />
            </div>
        </div>
    )
}

export default SalesGraphs
