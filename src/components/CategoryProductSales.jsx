import { useEffect, useState } from 'react'
import DataInfo from './DataInfo';
import SimpleTable from './SimpleTable';

const CategoryProductSales = ({ dateFrom, dateTo }) => {
    const [categories, setCategories] = useState([]);
    const backend_url = process.env.REACT_APP_BACK_URL;
    const [info, setInfo] = useState({});
    const [productSalesHeaders, setProductSalesHeaders] = useState(['Producto', 'Total ventas ($)']);
    const [productSalesData, setProductSalesData] = useState([]);
    const [productSalesDataKeys, setProductSalesDataKeys] = useState(['name', 'sales']);
    const [category, setCategory] = useState('Bebidas');

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

    // Get info between selected dates from backend
    const get_info = async () => {
        fetch(`${backend_url}/get_info/${dateFrom}/${dateTo}`)
            .then(res => res.json())
            .then(data => {
                setInfo(data);
            })
            .catch(err => console.log(err));
    }

    // handle category change
    const handle_category_change = (event) => {
        setCategory(event.target.value);
        get_product_sales(event.target.value);
    }

    // Get product sales from backend
    const get_product_sales = async (category) => {
        fetch(`${backend_url}/get_product_sales/${category}/${dateFrom}/${dateTo}`)
            .then(res => res.json())
            .then(data => {
                setProductSalesData(data);
            })  
            .catch(err => console.log(err));
    }

    useEffect(() => {
        get_categories();
        get_info();
    }, [dateFrom, dateTo, backend_url]);

    useEffect(() => {
        get_product_sales(category);
    }, [category, dateFrom, dateTo, backend_url]);

    return (
        <>
            <div className='flex'>
                <div className='mx-auto'>
                    <label htmlFor='select_category' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>Selecciona una categoría</label>
                    <select onChange={handle_category_change} id='select_category' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className='mx-auto'>
                    <DataInfo info={info} />
                </div>
            </div>
            <div className='flex pt-10 mx-auto'>
                <SimpleTable className='w-10/12' headers={productSalesHeaders} data={productSalesData} dataKeys={productSalesDataKeys}/>
            </div>
        </>
    )
}

export default CategoryProductSales
