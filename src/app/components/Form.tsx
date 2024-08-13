'use client';
import Image from "next/image";
import styles from "./page.module.css";
import React from 'react';
import { Button, Checkbox, Form as AntForm, Input } from 'antd';


    interface FormProps{ 
    onSubmit : () => void;

}


    
export default function Form({ onSubmit}: FormProps) {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
    };


    
    return (
        <AntForm<FieldType>
            name="basic"
        onFinish=(onSubmit)
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
          <Input />
        </AntForm.Item>

        <AntForm.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </AntForm.Item>

        <AntForm.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </AntForm.Item>

        <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={}>
            Submit
          </Button>
        </AntForm.Item>
      </AntForm>
    )

 }