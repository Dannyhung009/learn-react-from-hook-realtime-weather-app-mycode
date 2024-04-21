import React from 'react';
// import WeatherIcon from "../components/WeatherIcon";
// import dayjs from "dayjs";
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import WeatherIcon from './../components/WeatherIcon.js';
import { ReactComponent as AirFlowIcon } from './../images/airFlow.svg';
import { ReactComponent as RainIcon } from './../images/rain.svg';
import { ReactComponent as RefreshIcon } from './../images/refresh.svg';
import { ReactComponent as LoadingIcon } from './../images/loading.svg';


const WeatherCardWrapper = styled.div`
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




const WeatherCard = ({ weatherElement, moment, fetchData }) => {
    // return (<div>WeatherCard</div>);
    const {
        observationTime,
        locationName,
        temperature,
        windSpeed,
        description,
        weatherCode,
        rainPossibility,
        comfortability,
        isLoading,
    } = weatherElement;








    return (
        <WeatherCardWrapper>
            <Location>{locationName}</Location>
            <Description>{description}{comfortability}</Description>
            <CurrentWeather>
                <Temperature>
                    {/*{Math.round(Number(temperature))}*/}
                    {temperature} <Celsius>°C</Celsius>
                    {console.log(`temperature`, temperature)}
                </Temperature>
                {/* <DayCloudy /> */}
                {/* WeatherIcon */}
                {/* STEP 2：使用 WeatherIcon 元件 */}
                {/* 將 weatherCode 和 moment 以 props 傳入 WeatherIcon */}
                {/*<WeatherIcon weatherCode={weatherCode} moment="night"/>*/}


                { /* 把 moment 的值改成真是資料 */}

                <WeatherIcon weatherCode={weatherCode} moment={moment}/>;
            </CurrentWeather>
            <AirFlow>
                <AirFlowIcon/> {windSpeed} m/h
            </AirFlow>
            <Rain>
                <RainIcon/> {rainPossibility}%
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
                {isLoading ? <LoadingIcon/> : <RefreshIcon/>}
            </Refresh>
        </WeatherCardWrapper>
    )

};

export default WeatherCard;