import React from 'react';
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../Shared/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section style={{
            background: `url(${appointment})`
        }} className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-100px]' src={doctor} alt="" />
            </div>
            <div className='flex-1'>
                <h3 className='text-xl text-primary'>Appointment</h3>
                <h2 className='text-3xl text-white'>Make An Appointment Tody</h2>
                <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut tempore consequatur eligendi accusamus harum aspernatur porro! Consectetur at non ratione repudiandae laboriosam corporis obcaecati provident, beatae sit odit distinctio error molestiae libero suscipit doloremque atque aspernatur eos. Temporibus, illum nam!</p>
                <PrimaryButton>Get Started</PrimaryButton>
            </div>
        </section>
    );
};

export default MakeAppointment;