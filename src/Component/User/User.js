import React from 'react'
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react'


const User = ({ user }) => {
    console.log(user)

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    
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
        <div style={{ color: 'gray', paddingTop:'40px', paddingBottom:'40px', height:screenHeight -126 }}>
            <Row>
                <Col span={18} push={6} style={{textAlign:'left'}}>
                    <h1>{user?.userName}</h1>
                    <p>UID: {user?.uid}</p>
                    <h3>Email: {user?.email}</h3>

                </Col>
                <Col span={6} pull={18}>
                <img style={{width:'180px' }} src={user?.avt} />
                </Col>
            </Row>
        </div>
    )
}

export default User