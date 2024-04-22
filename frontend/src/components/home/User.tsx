import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import Button from '../shared/button';
import Input from '../shared/input';
import Modal from '../shared/modal';
import useCreateStatus from '../../hooks/useCreateStatus/useCreateStatus';
import { useForm } from 'react-hook-form';
import useUpdateStatus from '../../hooks/useUpdateStatus/useUpdateStatus';

type FormInputs = {
  content: string;
};

const User = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tempNewStatus, setTempNewStatus] = useState('');
  const { imgUrl, statuses, name, id } = useAppSelector(
    (state) => state.authReducer,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const { createStatus } = useCreateStatus();
  const { updateStatus } = useUpdateStatus();

  const onSubmit = async (formData: FormInputs) => {
    if (!statuses?.length && !tempNewStatus) {
      createStatus({ content: formData.content, userId: id });
      setTempNewStatus(formData.content);
      setIsOpen(false);
    } else {
      updateStatus({ content: formData.content, userId: id }, statuses[0]?.id);
      setTempNewStatus(formData.content);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex gap-5 items-center mb-7 pb-7 border-b border-white text-white">
      <img
        className="object-cover w-[160px] h-[155px] rounded-lg"
        src={imgUrl}
        alt=""
      />
      <div>
        <p className="text-xl font-semibold">{name}</p>
        {tempNewStatus ? (
          <p className="text-opacity-80">{tempNewStatus}</p>
        ) : (
          <p className="text-opacity-80">
            {statuses.length ? statuses[0].content : ''}
          </p>
        )}
        <div className="mt-5">
          <Button onClick={() => setIsOpen(true)}>
            {!statuses?.length && !tempNewStatus
              ? 'Add Status'
              : 'Update Status'}
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter status content"
            register={register('content', { required: 'Content required' })}
            errors={errors.content}
          />
          <Button type="submit">
            {!statuses?.length && !tempNewStatus
              ? 'Add status'
              : 'Update status'}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default User;
