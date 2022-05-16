import React from 'react';
import { toast } from 'react-toastify';

const DoctorRow = ({doctor, index}) => {
    const {name, specialty, img, email, refetch} = doctor;

    const handleDelete = email => {
        fetch(`http://localhost:5000/doctor${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then (data => {
            if(data.deletedCount){
                toast.success(`Docto: ${name} Is Deleted.`)
                refetch();
            }
        })
    }
    return (
        <tr>
        <th>{index = 1}</th>
        <td>
        <div class="avatar">
  <div class="w-20 rounded">
    <img src={img} alt={name} />
  </div>
</div>
        </td>
        <td>{name}</td>
        <td>{specialty}</td>
        <button onClick={() => handleDelete(email)} class="btn btn-xs">Delete</button>
      </tr>
    );
};

export default DoctorRow;