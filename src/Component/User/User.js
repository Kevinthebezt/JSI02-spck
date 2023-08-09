import React from 'react'
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react'
import "../../Css/User.css"

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
        <div class="card-user">
            <div class="img-avatar">
                <img src={user?.avt} />


            </div>
            <div class="card-text">
                <div class="portada">

                </div>
                <div class="title-total">
                    <div class="title">Ant Collector</div>
                    <h2>Morgan Sweeney</h2>

                    <div class="desc">Morgan has collected ants since they were six years old and now has many dozen ants but none in their pants.</div>
                    <div class="actions">
                        <button><i class="far fa-heart"></i></button>
                        <button><i class="far fa-envelope"></i></button>
                        <button><i class="fas fa-user-friends"></i></button>
                    </div></div>

            </div>

        </div>
    )
}

export default User