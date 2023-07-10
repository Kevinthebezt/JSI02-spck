import '../../Css/Content.css'
import rdr2 from '../../images/rdr2.jpg'
import { Carousel, Card, FloatButton, Pagination, Input } from 'antd';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';


function Content() {
    const history = useHistory();
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const { Meta } = Card;
    const { Search } = Input;
    const [data, setData] = useState()

    const contentStyle = {
        height: '300px',
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
    useEffect(() => {
        request()
    }, [])

    const request = async () => {
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
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
            setData(result)
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
            {/* <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src={img} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src={img2} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src={img3} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img style={{ width: '100%' }} src={img4} />
                    </h3>
                </div>

            </Carousel> */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '50px 0' }}>
                    <Search
                        placeholder="input search name game"
                        onSearch={request}
                        style={{
                            width: 300,
                        }}
                    />
                </div>
                <div className='gameList'>
                    {
                        data?.slice(offset, offset + limit).map((item) => {
                            return (
                                <Card
                                    hoverable
                                    style={{
                                        width: 320,
                                        height: 390,
                                        paddingBottom: 10,
                                        marginBottom: 20,
                                        color: "#9e9ea3",
                                    }}
                                    // cover={
                                    //     <img alt={item?.thumbnail} src={item?.thumbnail} />
                                    // }
                                    actions={[
                                        <span style={{ fontWeight: '500', color: 'black' }}>Price: {(item?.id * 23).toLocaleString()}$</span>,
                                    ]}
                                >
                                    <div onClick={() => history.push(`/game/${item?.id}`)}>
                                        <Meta
                                            title={item?.title}
                                        />
                                        <div className="card-description"
                                            style={{
                                                height: '70px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                            {item?.short_description}
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                <FloatButton.BackTop visibilityHeight={100} />
                <div style={{ marginBottom: 50 }}>
                    {
                        data?.length > 0 && (
                            <Pagination
                                current={Math.floor(offset / limit) + 1}
                                pageSize={limit}
                                total={data.length}
                                onChange={handlePageChange}
                            />
                        )
                    }
                </div>
                <p className='Footer'>Phát triển bởi © RevoltG</p>

            </div>
        </div>
    )

};
export default Content;