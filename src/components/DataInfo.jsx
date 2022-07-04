import React from 'react'

const DataInfo = ({ info }) => {
  return (
    <div>
        <div className='flex'>
            <p className='font-medium pr-2'>{'Comensales promedio:'}</p> <p>{info.avarage_diners}</p>
        </div>
        <div className='flex'>
            <p className='font-medium pr-2'>{'Ventas promedio:'}</p> <p>{'$' + info.avarage_sales}</p>
        </div>
        <div className='flex'>
            <p className='font-medium pr-2'>{'Ventas totales:'}</p> <p>{'$' + info.total_sales}</p>
        </div>
    </div>
  )
}

export default DataInfo
