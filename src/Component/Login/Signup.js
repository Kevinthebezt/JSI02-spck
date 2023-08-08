import { useEffect, useState } from 'react'
import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../../Css/Login.css'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Button, Checkbox, Form, Input } from 'antd';
import { Col, Row } from 'antd';



const Signup = ({ notification, setReload }) => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    
    const handleGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    };

    const history = new useHistory();


   





    const onFinish = async (value) => {
        console.log('Saved:', value);
        if (value?.password.length < 6) {
            notification('error', 'Password must be atleast 6 characters!')
            return false;
        }
        else if (value?.confirmPassword !== value?.password) {
            notification('error', 'Password does not match!')
            return false;
        } else {
            try {
                const result = await firebase.auth().createUserWithEmailAndPassword(value?.email, value?.password);
    
                // Cập nhật thông tin người dùng với tên đăng nhập
                await result.user.updateProfile({
                    displayName: value?.username,
                    // photoURL
                });
    
                notification('success', 'Signed up successfully!')
                history.push("/")
                setReload(true)
            } catch (error) {
                notification('error', error.message)
                // console.log(error.message);
            }
        }

        
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


        useEffect(() => {
            const handleResize = () => {
                setScreenHeight(window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            // Clean up the event listener when component unmounts
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

    return (
        <div style={{height: screenHeight -70}}>
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
                    label="Confirm password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your confirm password!',
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

                {/* <Form.Item
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
                </Form.Item> */}

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
                    {/* <Button type="primary" icon={<ArrowLeftOutlined />} style={{ marginTop: 10 }} onClick={() => history.push("/login")} ghost>
                    Back
                </Button> */}
                    <Row>

                        <Col span={8}><a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'right' }} onClick={handleGoogleLogin}>
                            Google
                        </a></Col>
                        <Col span={8}><p style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>|</p></Col>
                        <Col span={8}><a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'left' }} onClick={() => history.push("/login")}>
                            Login
                        </a></Col>

                    </Row>
                </Form.Item>
            </Form>
        </div>
    )

}


export default Signup;