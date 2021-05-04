import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstname: yup.string().required("REQUIRED").min(3,"TOO SHORT").matches(/^[a-z]+$/,"NO NUMBER"),
  lastname: yup.string().required("REQUIRED").min(3,"TOO SHORT").matches(/^[a-z]+$/,"NO NUMBER"),
  email: yup.string().required("REQUIRED").email("INVALID EMAIL"),
  age: yup.number().required().integer().positive(),
  password: yup.string().required("REQUIRED").min(3,"TOO SHORT"),
  cpassword: yup.string().required("REQUIRED").min(3,"TOO SHORT").oneOf([yup.ref('password'), null], 'Passwords must match')
});

function App() {
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  const submitclick = (data) => {
    console.log(data);
  }

  return (
    <div className="container p-5">
      <form onSubmit={handleSubmit(submitclick)}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" {...register("firstname")} placeholder="Enter First Name" />
          {
            errors.firstname &&
            <small className="form-text text-muted">
              {
                errors.firstname.message
              }
            </small>
          }
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" {...register("lastname")} placeholder="Enter Last Name" />
          {
            errors.lastname &&
            <small className="form-text text-muted">
              { errors.lastname.message }
            </small>
          }
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="text" className="form-control" {...register("email")} placeholder="Enter Email Address" />
          {
            errors.email &&
            <small className="form-text text-muted">
              { errors.email.message }
            </small>
          }
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" className="form-control" {...register("age")} placeholder="Enter Age" />
          {
            errors.age &&
            <small className="form-text text-muted">
              { errors.age.message }
            </small>
          }
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="text" className="form-control" {...register("password")} placeholder="Enter Password" />
          {
            errors.password &&
            <small className="form-text text-muted">
              { errors.password.message }
            </small>
          }
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="text" className="form-control" {...register("cpassword")} placeholder="Enter Password" />
          {
            errors.cpassword &&
            <small className="form-text text-muted">
              { errors.cpassword.message }
            </small>
          }
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
