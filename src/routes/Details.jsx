import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SimpleTable from '../components/SimpleTable';

const Details = () => {
    const {state} = useLocation();
    const [paymentHeaders, setPaymentHeaders] = useState(['Tipo', 'Cantidad ($)']);
    const [paymentKeys, setPaymentKeys] = useState(['type', 'amount']);
    const [productHeaders, setProductHeaders] = useState(['Producto', 'Categoría', 'Cantidad', 'Precio ($)']);
    const [productKeys, setProductKeys] = useState(['name', 'category', 'quantity', 'price']);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='w-10/12 mx-auto pt-10 pb-10'>
            <div className='flex'>
                <div className='flex-1'>
                    <div className='pb-5'>
                        <h class="font-medium leading-tight text-xl mt-0 mb-2 text-sky-800">Información</h>
                    </div>
                    <div className='pl-3'>
                        <div className='flex'>
                            <p className='font-medium pr-2'>{'Fecha Apertura:'}</p> <p>{state.date_opened}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-medium pr-2'>{'Fecha Cierre:'}</p> <p>{state.date_closed}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-medium pr-2'>{'Cantidad Comensales:'}</p> <p>{state.diners}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-medium pr-2'>{'Mesa:'}</p> <p>{state.table}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-medium pr-2'>{'Zona:'}</p> <p>{state.zone}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-medium pr-2'>{'Cajero:'}</p> <p>{state.cashier}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-medium pr-2'>{'Mesero:'}</p> <p>{state.waiter}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-medium pr-2'>{'Total:'}</p> <p>{'$' + state.total}</p>
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='pb-5'>
                        <h class="font-medium leading-tight text-xl mt-0 mb-2 text-sky-800">Pagos</h>
                    </div>
                    <SimpleTable headers={paymentHeaders} data={state.payments} dataKeys={paymentKeys}/>
                </div>
            </div>
            <div className='pt-10'>
                <div className='pb-5 '>
                    <h class="font-medium leading-tight text-xl mt-0 mb-2 text-sky-800">Productos</h>
                </div>
                <SimpleTable headers={productHeaders} data={state.products} dataKeys={productKeys}/>
            </div>
        </div>
    )
}

export default Details
