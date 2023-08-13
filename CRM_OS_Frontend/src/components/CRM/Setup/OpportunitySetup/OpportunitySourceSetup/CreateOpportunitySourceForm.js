import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  addSingleOpportunitySource,
  loadAllOpportunitySource,
} from "../../../../../redux/rtk/features/crm/opportunitySource/opportunitySourceSlice";

export default function CreateOpportunitySourceForm({ onClose }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const formData = {
      ...values,
    };
    const resp = await dispatch(addSingleOpportunitySource(formData));
    if (resp.payload.message === "success") {
      form.resetFields();
      dispatch(loadAllOpportunitySource());
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
          label='Opportunity Source Name'
          name='opportunitySourceName'
          tooltip='This is a required field'
          rules={[{ required: true, message: "Filed Required." }]}
        >
          <Input placeholder='Opportunity Source name' />
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
