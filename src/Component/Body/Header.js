import '../../Css/Header.css'
import { useHistory } from 'react-router-dom';
import { Affix, Avatar, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LaptopOutlined, LoginOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { react, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Swal from 'sweetalert2'




function Nav({ user, notification }) {
  const history = useHistory();
  const [current, setCurrent] = useState('mail');


  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      localStorage.removeItem("user");
      notification('success', 'Logged out successfully !')
      history.push("/")
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmNotification = () => {
    return Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to sign out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        return handleLogout();
      }
    })
  }

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
    {
      label: 'About',
      key: 'about',
      icon: <InfoCircleOutlined />,
    },
    !user ?
      {
        label: 'Login/Signup',
        key: 'login',
        icon: <LoginOutlined />,
      } : '',
    user ?
      {
        label:
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              user?.avt ? <Avatar src={user?.avt} style={{ marginRight: 10 }} /> : <Avatar style={{ marginRight: 10 }} icon={<UserOutlined />} />
            }
            <span>{user?.userName}</span>
          </div>,
        key: 'account',
        children: [
          {
            type: 'group',
            label: 'Profile',
            children: [
              {
                label: 'Information',
                key: 'information-user',
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
                  label: <div onClick={confirmNotification}>Log out</div>,
                } : '',
            ],
          },
        ],
      } : '',
  ];

  const onClick = (e) => {
    history.push(`${e.key}`)
    setCurrent(e.key);
  };


  return (
    <Affix offsetTop={0}>
      <div>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </div>
    </Affix>

  );
};

export default Nav;