import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, uError] = useUpdateProfile(auth);

      const navigate = useNavigate();

  let signInError;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loading || gLoading || updating) {
      return <button class="btn loading">loading</button>
  }

  if (error || gError || uError) {
        signInError = <p className="text-red-500">{error?.message || gError?. message || uError?.message}</p>
  }

  if (user || gUser) {
    console.log(gUser);
  }

  const onSubmit = async data => {
      console.log(data);
      await createUserWithEmailAndPassword(data.email, data.password)
      await updateProfile({ displayName: data.name });
      console.log('Update Done');
      navigate('/appointment');
  };

    return (
        <div className="flex h-screen justify-center items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

          <div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">Name</span>
  </label>
  <input 
  {...register("name", {
      required: {
          value: true,
          message: 'Name Is Required'
      }
  })}
  type="text" placeholder="Your Name" class="input input-bordered w-full max-w-xs" />

  <label class="label">
  {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}
  </label>
</div>


          <div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">Email</span>
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
  type="email" placeholder="Your Email" class="input input-bordered w-full max-w-xs" />

  <label class="label">
  {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
  {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
  </label>
</div>


<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">Password</span>
  </label>
  <input 
  {...register("password", {
      required: {
          value: true,
          message: 'Password Is Required'
      },
    minLength: {
       value: 6,
        message: 'Must Be 6 Characters'
    }
  })}
  type="password" placeholder="Your Password" class="input input-bordered w-full max-w-xs" />
  
  <label class="label">
  {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
  {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
  </label>
</div>

        {signInError}
            <input className="btn w-full max-w-xs" type="submit" value="Sign Up" />
          </form>
          <p>Already Have An Account? <Link className="text-primary" to='/login'>Please Login</Link></p>
          <div class="divider">OR</div>
          <button onClick={() => signInWithGoogle()} class="btn btn-outline">
            Continue With Google
          </button>
        </div>
      </div>
    </div>
    );
};

export default SignUp;