import '../../Css/Header.css'
import { useHistory } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { react, useState } from 'react';





function Nav() {
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
            {
              label: 'Log out',
              key: 'logout',
            },
          ],
        },
      ],
    },
  ];
  const history = useHistory();
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    history.push(`${e.key}`)
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <div className="demo-logo" />
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </>
  );
};

export default Nav;