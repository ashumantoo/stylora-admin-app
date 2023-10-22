import { Modal } from "antd";
import { FC } from "react";

interface IProps {
  open: boolean,
  title: string;
  description: string;
  okText?: string;
  delete?: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
}

export const ConfirmationModal: FC<IProps> = (props) => {
  const {
    open,
    title,
    description,
    okText,
    handleClose,
    handleSubmit
  } = props;
  return (
    <div className=''>
      <Modal
        title={title}
        open={open}
        centered
        onCancel={handleClose}
        footer={<>
          <button
            className={
              `px-4 py-1 rounded-md ${props.delete ? 'text-red-500 border border-red-500' : 'bg-blue-700 text-white'}`
            }
            onClick={handleSubmit}
          >
            {okText}
          </button>
        </>}
      >
        {description}
      </Modal>
    </div>
  )
}