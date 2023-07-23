import React from 'react';
import { Carousel, Card, FloatButton, Pagination, Input } from 'antd';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';


function Cart({ user }) {

    const [dataCart, setDataCart] = useState([])
    const { Meta } = Card;

    useEffect(() => {
        const inCart = localStorage.getItem(`carts${user?.uid}`);
        console.log("🚀 ~ file: Cart.js:17 ~ useEffect ~ inCart:", inCart)
        if (inCart) {
            setDataCart(JSON.parse(inCart));
        }
    })

    return (
        <div className='gameList'>
            {
                dataCart?.length > 0 ? dataCart?.map((item) => {
                    return (
                        <Card
                            hoverable
                            style={{
                                width: 320,
                                height: 289,
                                paddingBottom: 10,
                                marginBottom: 20,
                                color: "#9e9ea3",
                            }}
                            cover={
                                <img alt={item?.thumbnail} src={item?.thumbnail} />
                            }
                            actions={[
                                <span style={{ fontWeight: '500', color: 'black' }}>Price: {(item?.id * 23).toLocaleString()}$</span>,
                            ]}
                        >
                            <div >
                                <Meta
                                    title={item?.title}
                                />
                                {/* <div className="card-description"
                                            style={{
                                                height: '70px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                            {item?.short_description}
                                        </div> */}
                            </div>
                        </Card>
                    )
                }) : 'No data'
            }
        </div>
    );
};

export default Cart;