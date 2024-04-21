import { useForm } from 'react-hook-form';
import Input from '../shared/input';
import Button from '../shared/button';
import { useAppDispatch } from '../../redux/hooks';
import { logIn } from '../../redux/features/authSlice';
import useLogin from '../../hooks/useLogin/useLogin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type FormInputs = {
  emailOrUsername: string;
};

const Signin = () => {
  const { fetchUserByEmail, data, loading } = useLogin();
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
    fetchUserByEmail({ emailOrUsername: formData.emailOrUsername });
  };
  return (
    <div>
      <p className="text-center font-semibold mb-4 text-xl">
        Sign in to continue
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Enter e-mail or username"
          errors={errors.emailOrUsername}
          register={register('emailOrUsername', {
            required: 'Username or email required',
          })}
        />
        <Button type="submit" className="w-full mt-8">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Signin;
