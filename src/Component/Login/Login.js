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

import { Button, Checkbox, Form, Input } from 'antd';


const Login = ({ notification }) => {

  const [screenHeight, setScreenHeight] = useState();

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
  const onFinish = async (values) => {
    // console.log('Saved:', values);
    try {
      await firebase.auth().signInWithEmailAndPassword(values?.email, values?.password);
      notification('success', 'Login success !')
      history.push("/")
    } catch (error) {
      console.log(error)
      // notification("error", "Login failed! Please check your Email and Password!")
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{height: screenHeight}}>

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
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Auto login</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          {/* <Button type="primary" style={{ marginTop: 10 }} onClick={() => history.push("/signup")} ghost>
          Sign up
        </Button> */}

          <Row>

            <Col span={8}><a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'right' }} onClick={handleGoogleLogin}>
              Google
            </a></Col>
            <Col span={8}><p style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>|</p></Col>
            <Col span={8}><a type="primary" style={{ marginTop: 10, color: '#aab3b9', textDecoration: 'none', display: 'flex', justifyContent: 'left' }} onClick={() => history.push("/signup")}>
              Sign up
            </a></Col>

          </Row>

        </Form.Item>
      </Form>
    </div>
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