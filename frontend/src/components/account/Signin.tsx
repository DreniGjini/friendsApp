import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../shared/input';
import Button from '../shared/button';
import { useAppDispatch } from '../../redux/hooks';
import { logIn } from '../../redux/features/authSlice';

type FormInputs = {
  email: string;
};

const Signin = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    dispatch(logIn({ username: data.email, token: 'exampleToken' }));
    localStorage.setItem('token', 'exampleToken');
  };

  return (
    <div>
      <p className="text-center font-semibold mb-4 text-xl">
        Sign in to continue
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Enter e-mail"
          type="email"
          errors={errors.email}
          register={register('email', { required: 'Email is required' })}
        />
        <Button type="submit" className="w-full mt-8">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Signin;
