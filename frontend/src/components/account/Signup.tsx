import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../shared/input';
import Button from '../shared/button';
import useRegister from '../../hooks/useRegister/useRegister';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logIn } from '../../redux/features/authSlice';

type FormInputs = {
  name: string;
  email: string;
  username: string;
  imgUrl: string;
};

const Signup = () => {
  const { registerUser, data, loading } = useRegister();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (data && !loading) {
      if (data.userData && data.token) {
        dispatch(logIn({ token: data.token, ...data.userData }));
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    }
  }, [data, loading, dispatch, navigate]);

  const onSubmit = async (formData: FormInputs) => {
    registerUser(formData);
  };
  return (
    <div>
      <p className="text-center font-semibold mb-4 text-xl">Register account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Enter your full name"
          register={register('name', { required: 'Full Name is required' })}
          errors={errors.name}
        />
        <Input
          placeholder="Enter e-mail"
          register={register('email', { required: 'Email is required' })}
          type="email"
          errors={errors.email}
        />
        <Input
          placeholder="Your username"
          register={register('username', { required: 'Status is required' })}
          errors={errors.username}
        />
        <div>
          <Input
            placeholder="Your image url"
            register={register('imgUrl', { required: 'Status is required' })}
            errors={errors.imgUrl}
          />
        </div>
        <Button type="submit" className="w-full mt-8">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Signup;
