import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {ThemeProvider} from '@emotion/react'
import dayjs from 'dayjs';

import {ReactComponent as DayCloudyIcon} from './images/day-cloudy.svg';
import {ReactComponent as AirFlowIcon} from './images/airFlow.svg';
import {ReactComponent as RainIcon} from './images/rain.svg';
import {ReactComponent as RefreshIcon} from './images/refresh.svg';

import { ReactComponent as LoadingIcon } from './images/loading.svg';

const theme = {
    light: {
        backgroundColor: '#ededed',
        foregroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        temperatureColor: '#757575',
        textColor: '#828282',
    },
    dark: {
        backgroundColor: '#1F2022',
        foregroundColor: '#121416',
        boxShadow:
            '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
        titleColor: '#f9f9fa',
        temperatureColor: '#dddddd',
        textColor: '#cccccc',
    },
};

const Container = styled.div`
    background-color: ${({theme}) => theme.backgroundColor};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WeatherCard = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({theme}) => theme.boxShadow};
    background-color: ${({theme}) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 30px 15px;
`;

const Location = styled.div`
    font-size: 28px;
    color: ${({theme}) => theme.titleColor};
    margin-bottom: 20px;
`;

const Description = styled.div`
    font-size: 16px;
    color: ${({theme}) => theme.textColor};
    margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Temperature = styled.div`
    color: ${({theme}) => theme.temperatureColor};
    font-size: 96px;
    font-weight: 300;
    display: flex;
`;

const Celsius = styled.div`
    font-weight: normal;
    font-size: 42px;
`;

const AirFlow = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: ${({theme}) => theme.textColor};
    margin-bottom: 20px;

    svg {
        width: 25px;
        height: auto;
        margin-right: 30px;
    }
`;

const Rain = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: ${({theme}) => theme.textColor};

    svg {
        width: 25px;
        height: auto;
        margin-right: 30px;
    }
`;

const DayCloudy = styled(DayCloudyIcon)`
    flex-basis: 30%;
`;

const Refresh = styled.div`
    position: absolute;
    right: 15px;
    bottom: 15px;
    font-size: 12px;
    display: inline-flex;
    align-items: flex-end;
    color: ${({theme}) => theme.textColor};

    svg {
        margin-left: 10px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        /* STEP 2：使用 rotate 動畫效果在 svg 圖示上 */
        animation: rotate infinite 1.5s linear;
    }

    /* STEP 1：定義旋轉的動畫效果，並取名為 rotate */
    @keyframes rotate {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
`;

const App = () => {
    console.log('invoke function component'); // 元件一開始加入 console.log
    const AUTHORIZATION_KEY = 'CWB-8127F782-92D2-4CBB-9023-AC3C39581F2C';
    const LOCATION_NAME = '臺北';// STEP 1：定義 LOCATION_NAME %E8%87%BA%E5%8C%97
    const [currentTheme, setCurrentTheme] = useState('light');

    // STEP 2：將 AUTHORIZATION_KEY 和 LOCATION_NAME 帶入 API 請求中
    const handleClick = () => {

    };
    const fetchCurrentWeather = () => {
        setCurrentWeather((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        fetch(
            `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&StationName=${LOCATION_NAME}`
            // `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME}`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                // STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
                const locationData = data.records.Station[0];
                // STEP 2：將風速（WDSD）和氣溫（TEMP）的資料取出
                // const weatherElements = locationData.WeatherElement.reduce(
                //     (neededElements, item) => {
                //         if (['WindSpeed'].includes(item.elementName)) {
                //             neededElements[item.elementName] = item.elementValue;
                //         }
                //         return neededElements;
                //     },
                //     {}
                // );
                // console.log(`weatherElements= ${weatherElements}`)

                // STEP 3：要使用到 React 組件中的資料
                setCurrentWeather({
                    observationTime: locationData.ObsTime.DateTime,
                    locationName: locationData.StationName,
                    temperature: '30',
                    // windSpeed: '4.9',
                    windSpeed: locationData.WeatherElement.WindSpeed,
                    // description: '多雲時晴',
                    description: locationData.WeatherElement.Weather,
                    rainPossibility: 60,
                    isLoading: false, // 資料拉取完後，把 isLoading 設為 false
                });
            });
    }
    // STEP 2：定義會使用到的資料狀態
    const [currentWeather, setCurrentWeather] = useState({
        observationTime: '2020-12-12 22:10:00',
        locationName: '臺北市',
        description: '多雲時晴',
        windSpeed: 3.6,
        temperature: 32.1,
        rainPossibility: 60,
        isLoading: true,
    });
    // useEffect 中 console.log
    // useEffect(() => {
    //     // useEffect 中 console.log
    //     console.log('execute function in useEffect');
    // });
    useEffect(() => {
        console.log('execute function in useEffect');
        fetchCurrentWeather();
    }, []);
    return (
        <ThemeProvider theme={theme[currentTheme]}>
            {/*theme={theme[currentTheme]}*/}
            {/*theme={theme.dark}*/}
            <Container>
                {/* JSX 中加入 console.log */}
                {/*{console.log('render')}*/}
                {console.log(`render, isLoading: ${currentWeather.isLoading}`)}
                <WeatherCard>
                    <Location>{currentWeather.locationName}</Location>
                    <Description>{currentWeather.description}</Description>
                    <CurrentWeather>
                        <Temperature>
                            {Math.round(currentWeather.temperature)} <Celsius>°C</Celsius>
                        </Temperature>
                        <DayCloudy/>
                    </CurrentWeather>
                    <AirFlow>
                        <AirFlowIcon/> {currentWeather.windSpeed} m/h
                    </AirFlow>
                    <Rain>
                        <RainIcon/> {currentWeather.rainPossibility}%
                    </Rain>
                    {/* STEP 2：綁定 onClick 時會呼叫 handleClick 方法 */}
                    <Refresh onClick={fetchCurrentWeather}>
                    {/*    最後觀測時間：*/}
                    {/*    {new Intl.DateTimeFormat('zh-TW', {*/}
                    {/*    hour: 'numeric',*/}
                    {/*    minute: 'numeric',*/}
                    {/*}).format(dayjs(currentWeather.observationTime))}{' '} <RefreshIcon/>*/}
                        最後觀測時間：
                        {new Intl.DateTimeFormat('zh-TW', {
                            hour: 'numeric',
                            minute: 'numeric',
                        }).format(dayjs(currentWeather.observationTime))}{' '}
                        {/*<RefreshIcon/>*/}
                        {currentWeather.isLoading ? <LoadingIcon /> : <RefreshIcon />}
                    </Refresh>
                </WeatherCard>
            </Container>
        </ThemeProvider>
    );
};

export default App;
