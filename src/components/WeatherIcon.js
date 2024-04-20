import React from 'react'
import styled from '@emotion/styled';


// import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg';
// const DayCloudy = styled(DayCloudyIcon)`
//     flex-basis: 30%;
// `;


// STEP 1：留意載入 SVG 圖檔的路徑
import { ReactComponent as DayCloudyIcon } from './../images/day-cloudy.svg';

// STEP 2：外圍先包一層 div
const IconContainer = styled.div`
  flex-basis: 30%;

  /* STEP 3：為 SVG 限制高度 */
  svg {
    max-height: 110px;
  }
`;




const WeatherIcon = () => {
  return (
    <IconContainer>
      <DayCloudyIcon />
    </IconContainer>
  );
}

export default WeatherIcon;
