import '../../Css/Header.css'
import { useHistory } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { react, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';




function Nav({ user }) {
  const history = useHistory();
  const [current, setCurrent] = useState('mail');

  const items = [
    {
      label: 'HOME',
      key: '',
      icon: <HomeOutlined />,
    },
    {
      label: 'GAMES',
      key: 'game',
      icon: <LaptopOutlined />,
    },
    !user ?
      {
        label: 'Signup',
        key: 'signup',
        icon: <LaptopOutlined />,
      } : '',
    {
      label: 'ACCOUNT',
      key: 'account',
      icon: <UserOutlined />,
      children: [
        {
          type: 'group',
          label: 'Profile',
          children: [
            {
              label: 'Information',
              key: 'info-account',
            },
            {
              label: 'Add money',
              key: 'add-money',
            },
            {
              label: 'VIP activation',
              key: 'vip-act',
            },
            user ?
              {
                label: 'Log out',
                key: 'logout',
              } : '',
          ],
        },
      ],
    },
  ];

  const onClick = (e) => {
    history.push(`${e.key}`)
    console.log('click ', e.key);
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      localStorage.removeItem("user");
      history.push("/")
      console.log('success', 'Logout success !')
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="demo-logo" />
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </>
  );
};

export default Nav;