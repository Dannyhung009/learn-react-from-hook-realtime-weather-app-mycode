import { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react'
import dayjs from 'dayjs';


import { ReactComponent as AirFlowIcon } from './images/airFlow.svg';
import { ReactComponent as RainIcon } from './images/rain.svg';
import { ReactComponent as RefreshIcon } from './images/refresh.svg';

import { ReactComponent as LoadingIcon } from './images/loading.svg';


// STEP 1：匯入 WeatherIcon 元件
import WeatherIcon from './components/WeatherIcon';

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
    background-color: ${({ theme }) => theme.backgroundColor};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WeatherCard = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 30px 15px;
`;

const Location = styled.div`
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};
    margin-bottom: 20px;
`;

const Description = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Temperature = styled.div`
    color: ${({ theme }) => theme.temperatureColor};
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
    color: ${({ theme }) => theme.textColor};
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
    color: ${({ theme }) => theme.textColor};

    svg {
        width: 25px;
        height: auto;
        margin-right: 30px;
    }
`;



const Refresh = styled.div`
    position: absolute;
    right: 15px;
    bottom: 15px;
    font-size: 12px;
    display: inline-flex;
    align-items: flex-end;
    color: ${({ theme }) => theme.textColor};

    svg {
        margin-left: 10px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        /* STEP 2：使用 rotate 動畫效果在 svg 圖示上 */
        //animation: rotate infinite 1.5s linear;
        animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
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
    // const handleClick = () => {
    //
    // };
    const fetchCurrentWeather = () => {
        // setWeatherElement((prevState) => ({
        //     ...prevState,
        //     isLoading: true,
        // }));
        // 留意這裡加上 return 直接把 fetch API 回傳的 Promise 再回傳出去
        return fetch(
            `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&StationName=${LOCATION_NAME}`
            // `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME}`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log('data1', data);
                // STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
                // const locationData = data.records.Station[0];
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

                // STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
                const locationData = data.records.Station[0];
                // STEP 3：要使用到 React 組件中的資料
                // setWeatherElement((prevState) => ({
                //     ...prevState,
                //     observationTime: locationData.ObsTime.DateTime,
                //     locationName: locationData.StationName,
                //     temperature: '30',
                //     // windSpeed: '4.9',
                //     windSpeed: locationData.WeatherElement.WindSpeed,
                //     // description: '多雲時晴',
                //     description: locationData.WeatherElement.Weather,
                //     rainPossibility: 60,
                //     isLoading: false, // 資料拉取完後，把 isLoading 設為 false
                // }));

                // 把取得的資料內容回傳出去，而不是在這裡 setWeatherElement
                return {
                    observationTime: locationData.ObsTime.DateTime,
                    // locationName: locationData.locationName,
                    // temperature: weatherElements.TEMP,
                    temperature: locationData.WeatherElement.AirTemperature,
                    // windSpeed: weatherElements.WDSD,
                };
            });
    }

    // STEP 2：定義會使用到的資料狀態
    // const [currentWeather, setCurrentWeather] = useState({
    //     observationTime: '2020-12-12 22:10:00',
    //     locationName: '臺北市',
    //     description: '多雲時晴',
    //     windSpeed: 3.6,
    //     temperature: 32.1,
    //     rainPossibility: 60,
    //     isLoading: true,
    // });
    const [weatherElement, setWeatherElement] = useState({
        observationTime: new Date(),
        locationName: '',
        temperature: '30',
        windSpeed: 0,
        description: '',
        weatherCode: 0,
        rainPossibility: 0,
        comfortability: '',
        isLoading: true,
        // comfortability: '舒適至悶熱',
        // weatherCode: 0,
        // isLoading: true,
    });
    // useEffect 中 console.log
    // useEffect(() => {
    //     // useEffect 中 console.log
    //     console.log('execute function in useEffect');
    // });
    // useEffect(() => {
    //     console.log('execute function in useEffect');
    //     // fetchCurrentWeather();
    //     // fetchWeatherForecast();
    //     // STEP 1：在 useEffect 中定義 async function 取名為 fetchData
    //     const fetchData = async () => {
    //         // STEP 2：使用 Promise.all 搭配 await 等待兩個 API 都取得回應後才繼續
    //         const data = await Promise.all([
    //             fetchCurrentWeather(),
    //             fetchWeatherForecast(),
    //         ]);
    //
    //         // STEP 3：檢視取得的資料
    //         console.log(data);
    //     };
    //
    //     // STEP 4：再 useEffect 中呼叫 fetchData 方法
    //     fetchData();
    // }, []);
    useEffect(() => {
        // const fetchData = async () => {
        //     // 在開始拉取資料前，先把 isLoading 的狀態改成 true
        //     setWeatherElement((prevState) => ({
        //         ...prevState,
        //         isLoading: true,
        //     }));
        //     // 直接透過陣列的解構賦值來取出 Promise.all 回傳的資料
        //     const [currentWeather, weatherForecast] = await Promise.all([
        //         fetchCurrentWeather(),
        //         fetchWeatherForecast(),
        //     ]);

        //     // 把取得的資料透過物件的解構賦值放入
        //     setWeatherElement({
        //         ...currentWeather,
        //         ...weatherForecast,
        //         isLoading: false,
        //     });
        // };

        fetchData();
    }, []);
    const {
        observationTime,
        locationName,
        description,
        windSpeed,
        temperature,
        rainPossibility,
        isLoading,
        // description,
        comfortability,
    } = weatherElement;

    const LOCATION_NAME_FORECAST = '臺北市';//%E8%87%BA%E5%8C%97%E5%B8%82
    const fetchWeatherForecast = () => {
        // 留意這裡加上 return 直接把 fetch API 回傳的 Promise 再回傳出去
        return fetch(
            `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_FORECAST}`
            //`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_FORECAST}`
        )
            .then((response) => response.json())
            .then((data) => {
                // const locationData = data.records.location[0];
                // const weatherElements = locationData.weatherElement.reduce(
                //     (neededElements, item) => {
                //         if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
                //             neededElements[item.elementName] = item.time[0].parameter;
                //         }
                //         return neededElements;
                //     },
                //     {}
                // );
                //
                // setWeatherElement((prevState) => ({
                //     ...prevState,
                //     description: weatherElements.Wx.parameterName,
                //     weatherCode: weatherElements.Wx.parameterValue,
                //     rainPossibility: weatherElements.PoP.parameterName,
                //     comfortability: weatherElements.CI.parameterName,
                // }));
                console.log(`data2`, data)
                const locationData = data.records.location[0];
                const weatherElements = locationData.weatherElement.reduce(
                    (neededElements, item) => {
                        if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
                            neededElements[item.elementName] = item.time[0].parameter;
                        }
                        return neededElements;
                    },
                    {}
                );
                console.log(`weatherElements`, weatherElements)

                // setWeatherElement((prevState) => ({
                //     ...prevState,
                //     description: weatherElements.Wx.parameterName,
                //     weatherCode: weatherElements.Wx.parameterValue,
                //     rainPossibility: weatherElements.PoP.parameterName,
                //     comfortability: weatherElements.CI.parameterName,
                // }));

                // 把取得的資料內容回傳出去，而不是在這裡 setWeatherElement
                return {
                    description: weatherElements.Wx.parameterName,
                    weatherCode: weatherElements.Wx.parameterValue,
                    rainPossibility: weatherElements.PoP.parameterName,
                    comfortability: weatherElements.CI.parameterName,
                };
            });
    };

    // STEP 1：把 fetchData 從 useEffect 中搬出來
    // const fetchData = async () => {
    //     // 在開始拉取資料前，先把 isLoading 的狀態改成 true
    //     setWeatherElement((prevState) => ({
    //         ...prevState,
    //         isLoading: true,
    //     }));
    //     // 直接透過陣列的解構賦值來取出 Promise.all 回傳的資料
    //     const [currentWeather, weatherForecast] = await Promise.all([
    //         fetchCurrentWeather(),
    //         fetchWeatherForecast(),
    //     ]);

    //     // 把取得的資料透過物件的解構賦值放入
    //     setWeatherElement({
    //         ...currentWeather,
    //         ...weatherForecast,
    //         isLoading: false,
    //     });
    // };

    // STEP 2：在 useEffect 中呼叫 fetchData


    // useCallback 中可以放入函式，這裡可以把原本 fetchData 做的事放入 useCallback 的函式中
    const fetchData = useCallback(async () => {
        // setWeatherElement((prevState) => (/* ... */);
        // ...
        // 在開始拉取資料前，先把 isLoading 的狀態改成 true
        setWeatherElement((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        // 直接透過陣列的解構賦值來取出 Promise.all 回傳的資料
        const [currentWeather, weatherForecast] = await Promise.all([
            fetchCurrentWeather(),
            fetchWeatherForecast(),
        ]);

        // 把取得的資料透過物件的解構賦值放入
        setWeatherElement({
            ...currentWeather,
            ...weatherForecast,
            isLoading: false,
        });
    }, []);



    return (
        <ThemeProvider theme={theme[currentTheme]}>
            {/*theme={theme[currentTheme]}*/}
            {/*theme={theme.dark}*/}
            <Container>
                {/* JSX 中加入 console.log */}
                {/*{console.log('render')}*/}
                {/*{console.log(`render, isLoading: ${isLoading}`)}*/}
                <WeatherCard>
                    <Location>{locationName}</Location>
                    <Description>{description}{comfortability}</Description>
                    <CurrentWeather>
                        <Temperature>
                            {/*{Math.round(Number(temperature))}*/}
                            {temperature} <Celsius>°C</Celsius>
                            {console.log(`temperature`, temperature)}
                        </Temperature>
                        {/* WeatherIcon */}
                        {/* STEP 2：使用 WeatherIcon 元件 */}
                        <WeatherIcon />
                        {/* <DayCloudy /> */}
                    </CurrentWeather>
                    <AirFlow>
                        <AirFlowIcon /> {windSpeed} m/h
                    </AirFlow>
                    <Rain>
                        <RainIcon /> {rainPossibility}%
                    </Rain>
                    {/* STEP 2：綁定 onClick 時會呼叫 handleClick 方法 */}
                    {/* STEP 3：在 onClick 中呼叫 fetchData */}
                    <Refresh
                        // onClick={() => {
                        //     fetchCurrentWeather();
                        //     fetchWeatherForecast();

                        // }}
                        onClick={fetchData}
                        isLoading={isLoading}>
                        {/*    最後觀測時間：*/}
                        {/*    {new Intl.DateTimeFormat('zh-TW', {*/}
                        {/*    hour: 'numeric',*/}
                        {/*    minute: 'numeric',*/}
                        {/*}).format(dayjs(currentWeather.observationTime))}{' '} <RefreshIcon/>*/}
                        最後觀測時間：
                        {new Intl.DateTimeFormat('zh-TW', {
                            hour: 'numeric',
                            minute: 'numeric',
                        }).format(dayjs(observationTime))}{' '}
                        {/*<RefreshIcon/>*/}
                        {isLoading ? <LoadingIcon /> : <RefreshIcon />}
                    </Refresh>
                </WeatherCard>
            </Container>
        </ThemeProvider>
    );
};

export default App;
