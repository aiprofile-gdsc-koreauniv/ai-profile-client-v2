import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo2.svg";
import question from "../assets/images/question.svg";
function WIP() {
  return (
    <Container>
      <Top>
        <Left>
          <Logo src={logo} />
          <Text>호랑이 사진관</Text>
        </Left>
      </Top>
      <Question src={question} />
      <Title>서비스 준비 중입니다.</Title>
      <Desc>
        <DescRed>2023년 9월 6일 13시</DescRed>에 정식 배포됩니다
      </Desc>
    </Container>
  );
}

export default WIP;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  max-width: 440px;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
`;
const Left = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
`;
const Logo = styled.img`
  width: 24px;
  height: 24px;
`;
const Text = styled.p`
  color: var(--black, #212121);

  /* aggro sb 16 */
  font-family: SB Aggro;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Question = styled.img`
  width: 109.405px;
  height: 92px;
  margin-top: 171px;
`;
const Title = styled.p`
  color: var(--black, #212121);

  /* pretendard bold 24 */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  letter-spacing: -0.456px;
  margin-top: 20px;
`;
const Desc = styled.p`
  color: var(--black, #212121);

  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.304px;
  margin-top: 4px;
`;
const DescRed = styled.em`
  color: var(--red, #d81921);
  text-align: center;

  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
