import React from 'react';
import '../../Css/Content.css'
import rdr2 from '../../images/rdr2.jpg'
import { Carousel, Card, FloatButton, Pagination, Input } from 'antd';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import { UserOutlined, DesktopOutlined, ClockCircleOutlined, EyeOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import { TreeSelect } from 'antd';
import { Empty } from 'antd'


function Content({ user, notification, addToCart }) {
    const history = useHistory();
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(12)
    const { Meta } = Card;
    const { Search } = Input;
    const [data, setData] = useState()

    const [valueSort, setValueSort] = useState();
    const onChange = (newValue) => {
        console.log(newValue);
        setValueSort(newValue);
    };
    const contentStyle = {
        height: '692px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const treeData = [
        {
          value: "shooter",
          title: "Shooter",
        },
        {
          value: "mmoarpg",
          title: "MMOARPG",
        },
        {
          value: "arpg",
          title: "Action Role-Playing Game",
        },
        {
          value: "strategy",
          title: "Strategy",
        },
        {
          value: "fighting",
          title: "Fighting",
        },
        {
          value: "racing",
          title: "Racing",
        },
        {
          value: "sports",
          title: "Sports",
        },
        {
          value: "cardgame",
          title: "Card Game",
        },
        {
          value: "moba",
          title: "MOBA",
        },
        {
          value: "fantasy",
          title: "Fantasy",
        },
      ];
    // const addToCart = (item) => {
    //     const inCart = localStorage.getItem(`carts${user?.uid}`);
    //     console.log(`carts${user?.uid}`);
    //     const cart = {
    //         ...item,
    //         userId: user?.uid
    //     };
    //     console.log(cart);

    //     if (user?.uid) {
    //         if (inCart) {
    //             let isCart = JSON.parse(inCart);
    //             let find = false;
    //             console.log(isCart);
    //             isCart = isCart.map(element => {
    //                 if (element.id === item.id) {
    //                     find = true;
    //                     notification('warning', 'Already in cart')
    //                     return { ...element };
    //                 } else {
    //                     return element;
    //                 }
    //             })
    //             if (!find) {
    //                 isCart.push(cart);
    //             }
    //             localStorage.setItem(`carts${user?.uid}`, JSON.stringify(isCart));
    //             return !find ? notification('success', 'Added successfully') : ''
    //         } else {
    //             localStorage.setItem(`carts${user?.uid}`, JSON.stringify([cart]));
    //             return notification('success', 'Added successfully');
    //         }
    //     } else {
    //         return notification('error', 'Please login to continue')
    //     }
    // }

    useEffect(() => {
        request()
    }, [valueSort])

    const request = async (value) => {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games${valueSort ? "?category=" + valueSort : ''}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ce2234ad95msh9d8c5043404fc84p1913a6jsn5df080088056',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            value ? setData(result.filter((item) => item?.title?.toLowerCase().includes(value.toLowerCase()))) : setData(result);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePageChange = (page, pageSize) => {
        const newOffset = (page - 1) * pageSize;
        setOffset(newOffset);
        setLimit(pageSize);
    };

    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <Carousel autoplay>
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

            </Carousel>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '50px 0' }}>
                    <Search
                        placeholder="input search name game"
                        onSearch={request}
                        style={{
                            width: 300,
                        }}
                    />

                    <TreeSelect
                        style={{
                            width: '100%',
                        }}
                        value={valueSort}
                        dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                        }}
                        treeData={treeData}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={onChange}
                    />
                </div>

                <div className='statistic'>
                    <Row gutter={16}>
                        <Col span={5}>
                            <Statistic title="Member" value={532375} prefix={<UserOutlined style={{ padding: '5px', backgroundColor: '#191b20', borderRadius: '10px' }} />} />
                        </Col>
                        <Col span={5}>
                            <Statistic title="Games" value={1496} prefix={<DesktopOutlined style={{ padding: '5px', backgroundColor: '#191b20', borderRadius: '10px' }} />} />
                        </Col>
                        <Col span={4}>
                            <Statistic title="Play time" value={10000000} prefix={<ClockCircleOutlined style={{ padding: '5px', backgroundColor: '#191b20', borderRadius: '10px' }} />} />
                        </Col>
                        <Col span={5}>
                            <Statistic title="Online" value={3024} prefix={<EyeOutlined style={{ padding: '5px', backgroundColor: '#191b20', borderRadius: '10px' }} />} />
                        </Col>
                        <Col span={5}>
                            <Statistic title="Playing" value={1169} prefix={<CaretRightOutlined style={{ padding: '5px', backgroundColor: '#191b20', borderRadius: '10px' }} />} />
                        </Col>
                    </Row>
                </div>

                <div className='gameList' style={{ justifyContent: 'space-around' }}>
                    {
                        data.length > 0 ? data?.slice(offset, offset + limit)?.map((item) => {
                            return (
                                <Card
                                    hoverable
                                    style={{
                                        width: 320,
                                        height: 289,
                                        paddingBottom: 10,
                                        marginBottom: 30,
                                        color: "#9e9ea3",
                                    }}
                                    cover={
                                        <img alt={item?.thumbnail} src={item?.thumbnail} onClick={() => history.push(`/game/${item?.id}`)} />
                                    }
                                    actions={[
                                        <span style={{ fontWeight: '500', color: '#b1b1b5' }}>Price: {(item?.id * 23).toLocaleString()}$</span>,
                                        <Button style={{ backgroundColor: 'transparent', width: 'auto' }} onClick={() => addToCart(item)} >Add to cart</Button>
                                    ]}
                                >
                                    <div >
                                        <Meta style={{ color: '#b1b1b5' }} onClick={() => history.push(`/game/${item?.id}`)}
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
                        }) : <Empty />
                    }
                </div>
                <div style={{ marginBottom: 50, color: '#b1b1b5' }}>
                    {
                        data?.length > 0 && (
                            <Pagination
                                current={Math.floor(offset / limit) + 1}
                                pageSize={limit}
                                total={data.length}
                                showSizeChanger={false}
                                onChange={handlePageChange}
                            />
                        )
                    }
                </div>
                <p className='Footer'>Phát triển bởi © RevoltG</p>
                <FloatButton.BackTop visibilityHeight={100} />

            </div>
        </div>
    )

};
export default Content;