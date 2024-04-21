import React, {useEffect, useState, useCallback, useMemo} from 'react';
import styled from '@emotion/styled';
import {ThemeProvider} from '@emotion/react'
import dayjs from 'dayjs';
import {getMoment} from './utils/helpers';
import WeatherCard from './views/WeatherCard';

import {ReactComponent as AirFlowIcon} from './images/airFlow.svg';
import {ReactComponent as RainIcon} from './images/rain.svg';
import {ReactComponent as RefreshIcon} from './images/refresh.svg';

import {ReactComponent as LoadingIcon} from './images/loading.svg';


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
    background-color: ${({theme}) => theme.backgroundColor};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AUTHORIZATION_KEY = 'CWB-8127F782-92D2-4CBB-9023-AC3C39581F2C';
const LOCATION_NAME = '臺北';// STEP 1：定義 LOCATION_NAME %E8%87%BA%E5%8C%97
const LOCATION_NAME_FORECAST = '臺北市';//%E8%87%BA%E5%8C%97%E5%B8%82


const App = () => {
    console.log('invoke function component'); // 元件一開始加入 console.log

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
        weatherCode, // 從 weatherElement 中取出 weatherCode 資料
    } = weatherElement;


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


    // const moment = getMoment(LOCATION_NAME_FORECAST);

    // TODO: 等使用者可以修改地區時要修改裡面的參數，先將 dependencies array 設為空陣列
    const moment = useMemo(() => getMoment(LOCATION_NAME_FORECAST), []);

    useEffect(() => {
        // 根據 moment 決定要使用亮色或暗色主題
        setCurrentTheme(moment === 'day' ? 'light' : 'dark');
    }, [moment]); // 記得把 moment 放入 dependencies 中


    return (
        <ThemeProvider theme={theme[currentTheme]}>
            {/*theme={theme[currentTheme]}*/}
            {/*theme={theme.dark}*/}
            <Container>
                {/* JSX 中加入 console.log */}
                {/*{console.log('render')}*/}
                {/*{console.log(`render, isLoading: ${isLoading}`)}*/}
                <WeatherCard
                    weatherElement={weatherElement}
                    moment={moment}
                    fetchData={fetchData}
                ></WeatherCard>
            </Container>
        </ThemeProvider>
    );
};

export default App;
