import React from 'react';

import '../../Css/Login.css'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Button, Checkbox, Form, Input } from 'antd';



const Signup = () => {

    const history = new useHistory();

    const onFinish = async (value) => {
        console.log('Saved:', value);
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(value?.email, value?.password);

            // Cập nhật thông tin người dùng với tên đăng nhập
            await result.user.updateProfile({
                displayName: value?.username,
                phoneNumber: value?.phoneNumber
                // photoURL
            });

            console.log('Sign up secessfully!');
            console.log('user-info:', result.user.displayName);
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 550,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}

            >

                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone number"
                name="sdt"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            {/* <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Auto log in</Checkbox>
    </Form.Item> */}

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    )

}


export default Signup;