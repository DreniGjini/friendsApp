import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../shared/input';
import Button from '../shared/button';

type FormInputs = {
  fullName: string;
  email: string;
  status: string;
  image: FileList;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    localStorage.setItem('token', 'exampleToken');
  };
  return (
    <div>
      <p className="text-center font-semibold mb-4 text-xl">Register account</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Enter your full name"
          register={register('fullName', { required: 'Full Name is required' })}
          errors={errors.fullName}
        />
        <Input
          placeholder="Enter e-mail"
          register={register('email', { required: 'Email is required' })}
          type="email"
          errors={errors.email}
        />
        <Input
          placeholder="Your status"
          register={register('status', { required: 'Status is required' })}
          errors={errors.status}
        />
        <div>
          <Input
            image
            register={register('image', { required: 'Image is required' })}
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
