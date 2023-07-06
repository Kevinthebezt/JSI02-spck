import '../../Css/Content.css'
import rdr2 from '../../images/rdr2.jpg'
import { Carousel } from 'antd';
import { useEffect, useState } from 'react'

function Content() {
    const contentStyle = {
        height: '540px',
        color: '#fff',
        lineHeight: '160px',
        itemsalign: 'center',
        textAlign: 'center',
        background: '#364d79',
    };
    const imgs = "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg"
    const [data, setData] = useState()
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
            setData(result.slice(0, 20))
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}><img src={imgs} /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src={imgs} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src={imgs} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src={imgs} />
                    </h3>
                </div>

            </Carousel>
            <div className='gameList'>

                {
                    data?.map((item) => {
                        return (
                            <div className='game-container'>
                                <div key={item?.id}>{item?.title}</div>
                                {/* <div key={item?.id}>{item?.platform}</div> */}
                                <img src={item?.thumbnail} />
                            </div>
                        )
                    })
                }

            </div>
        </>
    )

};
export default Content;