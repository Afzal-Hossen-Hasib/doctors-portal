import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user || gUser)

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
        navigate(from, { replace: true });
      }
  } ,[token, from, navigate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loading || gLoading) {
      return <button className="btn loading">loading</button>
  }

  if (error || gError) {
        signInError = <p className="text-red-500">{error?.message || gError?. message}</p>
  }

  const onSubmit = data => {
      console.log(data);
      signInWithEmailAndPassword(data.email, data.password)
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>


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
    <span className="label-text">Password</span>
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
  type="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs" />
  
  <label className="label">
  {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
  {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
  </label>
</div>

        {signInError}
            <input className="btn w-full max-w-xs" type="submit" value="Login" />
          </form>
          <p>New To Doctors Portal? <Link className="text-primary" to='/signup'>Create New Account</Link></p>
          <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-outline">
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
