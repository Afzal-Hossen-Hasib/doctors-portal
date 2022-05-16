import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const AddDoctor = () => {

    const {
        register,
        formState: { errors },
        handleSubmit, reset
      } = useForm();

      const {data: services, isLoading} = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()));

      const imgStorageKey = '8bdb4e702e7e5e5ae292808fe20463b2';


      const onSubmit = async data => {
          console.log('data', data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch (url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            console.log('imgbb', result);
            if (result.success) {
                const img = result.data.url;
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    img: img
                }

                fetch('http://localhost:5000/doctor', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res=> res.json())
                .then(inserted => {
                    console.log('doctor', inserted);
                    if(inserted.insertedId) {
                        toast.success('Doctor Added Successfully')
                        reset();
                    }
                    else {
                        toast.error('Failed To Added Doctor')
                    }
                })
            }
    
        })
    };

    if (isLoading) {
        return <button className="btn loading">loading</button>
    }


    return (
        <div>
            <h2>Add A New Doctor</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Name</span>
  </label>
  <input 
  {...register("name", {
      required: {
          value: true,
          message: 'Name Is Required'
      }
  })}
  type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />

  <label className="label">
  {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
  </label>
</div>


          <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Email</span>
  </label>
  <input 
  {...register("email", {
      required: {
          value: true,
          message: 'Email Is Required'
      },
    pattern: {
       value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        message: 'Provide A Valid Email'
    }
  })}
  type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />

  <label className="label">
  {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
  {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
  </label>
</div>


<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Specialty</span>
  </label>
  <select {...register('specialty')} class="select input-bordered w-full max-w-xs">
      {
          services.map (service => <option
            key={service._id}
            value={service.name}
          >{service.name}</option>)
      }

</select>

</div>

<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Photo</span>
  </label>
  <input 
  {...register("image", {
      required: {
          value: true,
          message: 'Image Is Required'
      }
  })}
  type="file" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />

  <label className="label">
  {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
  </label>
</div>

            <input className="btn w-full max-w-xs" type="submit" value="Add" />
          </form>
        </div>
    );
};

export default AddDoctor;