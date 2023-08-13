import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  addSingleTaskPriority,
  loadAllTaskPriority,
} from "../../../../../redux/rtk/features/crm/taskPriority/crmTaskPrioritySlice";

export default function CreateCrmTaskPriorityForm({ onClose }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const formData = {
      ...values,
    };
    const resp = await dispatch(addSingleTaskPriority(formData));
    if (resp.payload.message === "success") {
      form.resetFields();
      dispatch(loadAllTaskPriority());
      onClose();
    }
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className='flex justify-center mt-5'>
      <Form
        className='w-4/5'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        colon={false}
        layout='vertical'
        form={form}
      >
        <Form.Item
          style={{ width: "350px" }}
          label='Task Priority Name'
          name='taskPriorityName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "This is a required field." }]}
        >
          <Input placeholder='Task Priority name' />
        </Form.Item>

        <Form.Item label=''>
          <div className='flex items-center gap-2'>
            <Button size={"large"} htmlType='submit' type='primary'>
              Create
            </Button>
            <Button
              size={"large"}
              htmlType='submit'
              type='danger'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
