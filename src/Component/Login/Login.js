// import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
// import { Button, Input, Space } from 'antd';

// import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../Css/Login.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Col, Row } from 'antd';

import { Form, Input, Button, Checkbox, Card, Carousel } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = ({ notification }) => {

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const history = new useHistory();
    const contentStyle = {
        minheight: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };


    const handleGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            notification('success', 'Login success !')
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    };

    const onFinish = async (values) => {
        // console.log('Saved:', values);
        try {
            await firebase.auth().signInWithEmailAndPassword(values?.email, values?.password);
            notification('success', 'Login success !')
            history.push("/")
        } catch (error) {
            console.log(error)
            notification('error', "Email or password incorrect")
            // notification("error", "Login failed! Please check your Email and Password!")
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
        <div>
            {/* <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src='https://cdn.cloudflare.steamstatic.com/steam/apps/671860/header.jpg?t=1686877598' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src='https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg?t=1691007781' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src='https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg?t=1678296348' />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src='https://cdn.cloudflare.steamstatic.com/steam/apps/1184140/header.jpg?t=1689199309' />
                    </h3>
                </div>

            </Carousel> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    // position: "fixed",
                    zIndex: "1000000"
                }}>

                <Card style={{ width: 500 }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h1 style={{ color: 'white' }}>Login</h1>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        {/* <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}>
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        /> */}
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}>
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <a
                            style={{ float: "right" }}
                            className="login-form-forgot"
                            href="#"
                        // onClick={handleForgotPassword}
                        >
                            Forgot password
                        </a>
                        {/* </Form.Item> */}
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            {/* <Button type="primary" style={{ marginTop: 10 }} onClick={() => history.push("/signup")} ghost>
           Sign up
         </Button> */}

                            <Row>
                                <Col span={8}>
                                    <a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'right' }} onClick={handleGoogleLogin}>
                                        Google
                                    </a>
                                </Col>
                                <Col span={8}>
                                    <p style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>|</p></Col>
                                <Col span={8}>
                                    <a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'left' }} onClick={() => history.push("/signup")}>
                                        Sign up
                                    </a>
                                </Col>

                            </Row>

                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
        // <div style={{ height: screenHeight - 70 }}>

        //     <Form
        //         name="basic"
        //         // labelCol={{
        //         //   span: 8,
        //         // }}
        //         style={{
        //             width: '100%',
        //             padding: '0 30px',
        //             height: '600px'
        //         }}
        //         initialValues={{
        //             remember: true,
        //         }}
        //         onFinish={onFinish}
        //         onFinishFailed={onFinishFailed}
        //         autoComplete="off"
        //     >
        //         <div style={{ paddingTop: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        //             <Form.Item
        //                 label="Email"
        //                 name="email"
        //                 style={{
        //                     display: 'flex',
        //                     justifyContent: 'space-around',
        //                     alignItems: 'center'
        //                 }}
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your email!',
        //                     },
        //                 ]}
        //             >
        //                 <Input style={{ width: '250px' }} />
        //             </Form.Item>

        //             <Form.Item
        //                 label="Password"
        //                 name="password"
        //                 style={{
        //                     display: 'flex',
        //                     justifyContent: 'space-around',
        //                     alignItems: 'center'
        //                 }}
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: 'Please input your password!',
        //                     },
        //                 ]}>
        //                 <Input.Password style={{ width: '300px' }} />
        //             </Form.Item>

        //             <Form.Item style={{
        //                 display: 'flex',
        //                 justifyContent: 'center',
        //                 alignItems: 'center'
        //             }}
        //                 name="remember"
        //                 valuePropName="checked">
        //                 <Checkbox>Auto login</Checkbox>
        //             </Form.Item>
        //         </div>


        //         <Form.Item style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        //             <Button type="primary" htmlType="submit">
        //                 Login
        //             </Button>
        //             {/* <Button type="primary" style={{ marginTop: 10 }} onClick={() => history.push("/signup")} ghost>
        //   Sign up
        // </Button> */}

        //             <Row>
        //                 <Col span={8}>
        //                     <a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'right' }} onClick={handleGoogleLogin}>
        //                         Google
        //                     </a>
        //                 </Col>
        //                 <Col span={8}>
        //                     <p style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>|</p></Col>
        //                 <Col span={8}>
        //                     <a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'left' }} onClick={() => history.push("/signup")}>
        //                         Sign up
        //                     </a>
        //                 </Col>

        //             </Row>

        //         </Form.Item>
        //     </Form>
        // </div>
    )
}


// const Login = () => {
//     const [passwordVisible, setPasswordVisible] = React.useState(false);
//     return (
//         <Space direction="vertical">

//             <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
//             <Input.Password
//                 placeholder="Mật khẩu"
//                 iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
//             />
//         </Space>
//     );
// };

export default Login;