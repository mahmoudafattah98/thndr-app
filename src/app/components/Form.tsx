'use client';
import React, { useState } from 'react';
import { Button, Checkbox, Form as AntForm, Input } from 'antd';

interface FormProps {
  onSubmit: (values: FieldType) => void;
}

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export default function Form({ onSubmit }: FormProps) {
const[username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(e.target.value)
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(e.target.value)
  };

  const handleFinish = () => {
    onSubmit({ username, password, remember: true });
  };

  return (
    <>
      <AntForm<FieldType>
        name="basic"
        onFinish={handleFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <AntForm.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input onChange={handleUsernameChange}/>
        </AntForm.Item>

        <AntForm.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={handlePasswordChange} />
        </AntForm.Item>

        <AntForm.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </AntForm.Item>

        <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </AntForm.Item>
      </AntForm>
    </>
  );
}
