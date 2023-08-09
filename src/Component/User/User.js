import React from 'react'
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react'
import "../../Css/User.css"
import { InstagramOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

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
        <div className="card-user">
            <div className="img-avatar">
                <img src={user?.avt} />
            </div>
            <div className="card-text">
                <div className="portada">

                </div>
                <div className="title-total">
                    <div className="title">Member</div>
                    <h2>{user?.userName}</h2>

                    <div className="desc">Email: &nbsp;{user?.email}</div>
                    <div className="actions">
                        <button><FacebookOutlined /></button>
                        <button><GoogleOutlined /></button>
                        <button><InstagramOutlined /></button>
                    </div></div>

            </div>

        </div>
    )
}

export default User