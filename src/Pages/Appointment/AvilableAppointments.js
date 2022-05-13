import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Booking from './Booking';
import BookingModal from './BookingModal';

const AvilableAppointments = ({date}) => {
    const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    const formateDate = format(date, 'PP');
    useEffect ( () =>{
        fetch(`http://localhost:5000/available?date=${formateDate}`)
        .then (res => res.json())
        .then (data => setServices(data));
    } ,[])
    return (
        <div>
            <h4 className='text-center text-xl text-secondary'>Available Appointments on {format(date, "PP")}</h4>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                   services.map (service => <Booking
                    key={service._id}
                    service={service}
                    setTreatment={setTreatment}
                   ></Booking>) 
                }
            </div>
            {treatment && <BookingModal 
            date={date} 
            treatment={treatment} 
            setTreatment={setTreatment}></BookingModal>}
        </div>
    );
};

export default AvilableAppointments;