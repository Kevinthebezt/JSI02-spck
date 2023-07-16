import React from 'react';
import { useEffect, useState } from 'react'
import { StarFilled, TagFilled, InfoCircleFilled, CalendarFilled, PlaySquareOutlined } from '@ant-design/icons';
import '../../Css/Detail.css'
import { Button, Space } from 'antd';
import { Col, Row } from 'antd';
import { Carousel } from 'antd';


function Detail({ match }) {
    // const contentStyle = {
    //     height: '160px',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    // };
    // console.log(match);

    const contentStyle = {
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const imgs = "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg"
    const img = "https://cdn.sforum.vn/sforum/wp-content/uploads/2022/03/3-32.jpg"
    const img2 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_22.jpg"
    const img3 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_5.jpg"
    const img4 = "https://bloghomestay.vn/wp-content/uploads/2023/01/999-anh-game-3d-hinh-game-online-dep-nhat-danh-cho-game-thu_8.jpg"
    const [data, setData] = useState([])
    useEffect(() => {
        request()
    }, [])

    const request = async () => {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${match?.match?.params?.id}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5515175e93mshdf277ee740991dap1eee52jsn20dd8885cdf1',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }
    console.log(data);
    return (
        <div style={{ width: '100%', height: 'auto', margin:'0 50px' }}>
            <Row>
                <Col span={12}><Carousel autoplay>
                    {
                        data?.screenshots?.map((item) => {
                            console.log("===================", data);
                            return (
                                <div>
                                    <img src={item?.image} style={{ width: '100%', height: 'auto' }} />
                                </div>


                            )
                        })
                    }
                </Carousel></Col>
                <Col span={12}>
                    {/* <div className='gameList'> */}
                    <Row>
                        <Col span={24}><p>{data.short_description}</p></Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Col span={18} push={6}>
                                    <p style={{ color: 'green' }}>RELEASE DATE: </p>
                                    <p>{data.release_date}</p>
                                </Col>
                                <Col span={6} pull={18}>
                                    <CalendarFilled style={{ color: 'green' }} />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={12}>
                            <Row>
                                <Col span={18} push={6}>
                                    <p style={{ color: 'purple' }}>PLATFORM: </p>
                                    <p>{data.platform}</p>
                                </Col>
                                <Col span={6} pull={18}>
                                    <InfoCircleFilled style={{ color: 'purple' }} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Col span={18} push={6}>
                                    <p style={{ color: 'blue' }}>GENRE:</p>
                                    <p>{data.genre}</p>
                                </Col>
                                <Col span={6} pull={18}>
                                    <TagFilled style={{ color: 'blue' }} />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={12}>
                            <Row>
                                <Col span={18} push={6}>
                                    <p style={{ color: 'yellow' }}>PUBLISHER:</p>
                                    <p>{data.publisher}</p>
                                </Col>
                                <Col span={6} pull={18}>
                                    <StarFilled style={{ color: 'yellow' }} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Button className='btn' type="primary" block>
                            <PlaySquareOutlined /> PLAY NOW
                        </Button>
                    </Row>

                    {/* </div> */}
                </Col>
            </Row>
            {/* <Carousel autoplay>
                {
                    data?.screenshots?.map((item) => {
                        console.log("===================", data);
                        return (
                            <div>
                                <img src={item?.image} style={{ width: '100%', height: 'auto' }} />
                            </div>


                        )
                    })
                }
            </Carousel>
            <div className='gameList'>
                <div>
                    <p>{data.description}</p>
                </div>
                <div>
                    <div>
                        <CalendarFilled />
                        <p style={{ color: 'green' }}>RELEASE DATE:</p>
                        <p>{data.release_date}</p>
                    </div>
                    <div>
                        <InfoCircleFilled />
                        <p style={{ color: 'purple' }}>PLATFORM: </p>
                        <p>{data.platform}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <TagFilled />
                        <p style={{ color: 'blue' }}>GENRE:</p>
                        <p>{data.genre}</p>
                    </div>
                    <div>
                        <StarFilled />
                        <p style={{ color: 'yellow' }}>PUBLISHER:</p>
                        <p>{data.publisher}</p>
                    </div>
                </div>
                <Button className='btn' type="primary" block>
                    <PlaySquareOutlined /> PLAY NOW
                </Button>
            </div> */}
            <p className='Footer'>Phát triển bởi © RevoltG</p>
        </div>
    )

};
export default Detail;