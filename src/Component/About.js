import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, QRCode } from 'antd';
import { useState, useEffect } from 'react';
const About = () => {
    const [size, setSize] = useState(260);
    const increase = () => {
        setSize((prevSize) => {
            const newSize = prevSize + 10;
            if (newSize > 300) {
                return 300;
            }
            return newSize;
        });
    };
    const decline = () => {
        setSize((prevSize) => {
            const newSize = prevSize - 10;
            if (newSize < 48) {
                return 48;
            }
            return newSize;
        });
    };

    const [screenHeight, setScreenHeight] = useState();
    
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
        <div style={{ width: '50%', height:screenHeight, display: 'flex', flexDirection: 'column', padding: 50, margin:'auto', alignItems:'center' }}>
            <Button.Group
                style={{
                    marginBottom: 16,
                }} >
                <Button onClick={decline} disabled={size <= 48} icon={<MinusOutlined />}>
                    Smaller
                </Button>
                <Button onClick={increase} disabled={size >= 300} icon={<PlusOutlined />}>
                    Larger
                </Button>
            </Button.Group>
            <QRCode
                errorLevel="H"
                size={size}
                iconSize={size / 4}
                value="https://free-game.vercel.app/"
            // icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
        </div>
    );
};
export default About;