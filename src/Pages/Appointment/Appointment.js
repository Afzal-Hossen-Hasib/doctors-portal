import React, { useState } from 'react';
import Footer from '../Home/Footer';
import AppointmentBanner from './AppointmentBanner';
import AvilableAppointments from './AvilableAppointments';

const Appointment = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner date={date} setDate={setDate}></AppointmentBanner>
            <AvilableAppointments date={date}></AvilableAppointments>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;