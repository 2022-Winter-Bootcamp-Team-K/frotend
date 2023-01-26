import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// import styled from 'styled-components';

import './Background.css';
import SketchBook from './MyPageSketch';
import Line from './MyPageLine';
import MyPageItems from './MyPageItems';
import logo from '../Image/logo2.png';

import './Mypage.css';

const backBaseUrl = process.env.REACT_APP_BACKEND_URL;

const BtnWrap = styled.div`
  position: relative;
  text-align: center;
`;
const BackBtn = styled.button`
  //상단 로그인 버튼
  width: 14rem;
  height: 5.5rem;

  font-size: 2rem;

  color: white;
  font-family: 'Cafe24Ssurround';
  text-shadow: 2px 2px 2px gray;
  -webkit-text-stroke-width: 1.1px;
  -webkit-text-stroke-color: black;
`;

const HomeBtn = styled.button`
  //상단 로그인 버튼
  width: 20rem;
  height: 3rem;
  position: relative;

  font-size: 2.5rem;
  font-weight: 1000;

  color: white;
`;

function MyPage() {
  const userId = localStorage.getItem('id');
  const [myRollPageData, setMyRollPageData] = useState();

  useEffect(() => {
    const GetPapers = async () => {
      try {
        const datas = await axios.get(`${backBaseUrl}/api/v1/users/${userId}`);
        // eslint-disable-next-line
        console.log('successGet');
        setMyRollPageData(datas.data);
        console.log(datas);
      } catch (e) {
        // 서버에서 받은 에러 메시지 출력
        // eslint-disable-next-line
        console.log(e);
      }
    };
    GetPapers();
  }, []);
  // eslint-disable-next-line
  // console.log(myRollPageData);
  const navigate = useNavigate();
  return (
    <div className="mypage">
      <BackBtn onClick={() => navigate('/welcome')}>＜뒤로가기</BackBtn>
      <BtnWrap>
        <HomeBtn onClick={() => navigate('/welcome')}>
          <img src={logo} alt="" />
        </HomeBtn>
      </BtnWrap>
      <SketchBook myRollPageData={myRollPageData} />
      <Line myRollPageData={myRollPageData} />
      <MyPageItems myRollPageData={myRollPageData} />
    </div>
  );
}

export default MyPage;
