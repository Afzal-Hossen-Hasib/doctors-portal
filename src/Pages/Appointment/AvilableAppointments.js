import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Booking from './Booking';
import BookingModal from './BookingModal';

const AvilableAppointments = ({date}) => {
    const [treatment, setTreatment] = useState(null);

    const formateDate = format(date, 'PP');

    const {data: services, isLoading, refetch} = useQuery(['available', formateDate], ()=> fetch(`http://localhost:5000/available?date=${formateDate}`)
        .then (res => res.json()))

        if (isLoading) {
            return <button className="btn loading">loading</button>
        }



    return (
        <div>
            <h4 className='text-center text-xl text-secondary'>Available Appointments on {format(date, "PP")}</h4>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                   services?.map (service => <Booking
                    key={service._id}
                    service={service}
                    setTreatment={setTreatment}
                   ></Booking>) 
                }
            </div>
            {treatment && <BookingModal 
            date={date} 
            treatment={treatment} 
            setTreatment={setTreatment}
            refetch={refetch}
            ></BookingModal>}
        </div>
    );
};

export default AvilableAppointments;