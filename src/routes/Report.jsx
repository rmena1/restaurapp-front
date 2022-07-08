import React from 'react'
import { useParams } from 'react-router-dom'
import CategoryProductSales from '../components/CategoryProductSales'
import SalesGraphs from '../components/SalesGraphs'

const Report = () => {
    const { date_from, date_to } = useParams()

    return (
        <div className='w-5/6 pt-20 mx-auto'>
            <h1 className="font-medium leading-tight text-xl mt-0 text-sky-800 mb-10">Reporte de ventas realizadas entre {date_from} y {date_to}</h1>
            <CategoryProductSales dateFrom={date_from} dateTo={date_to} />
            <SalesGraphs dateFrom={date_from} dateTo={date_to} />
        </div>
    )
}

export default Report
