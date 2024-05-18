import React, { useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/images/logo2.svg";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Progress as progressbar } from "../recoil/progress";
function TopBar() {
  const [progress, setProgress] = useRecoilState(progressbar);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Top>
        <Left>
          <Logo src={logo} />
          <Text>호랑이 사진관</Text>
        </Left>
        {/* <Right>
          <Progress>{progress}</Progress>/4
        </Right> */}
      </Top>
      <LineBg>
        <Line progress={progress} />
      </LineBg>
    </Container>
  );
}

export default TopBar;
const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  max-width: 440px;
  background: #fff;
  z-index: 10000;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
const Right = styled.p`
  color: var(--black, #212121);
  font-family: SB Aggro;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  letter-spacing: -0.266px;
  margin-right: 16px;
`;
const Progress = styled.em`
  color: var(--red, #d81921);
  text-align: right;
  font-family: SB Aggro;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%; /* 21px */
  letter-spacing: -0.266px;
`;
const LineBg = styled.div`
  width: calc(100% - 32px);
  height: 3px;
  flex-shrink: 0;
  background: var(--grey, #d9d9d9);
  margin-top: 12px;
`;
const Line = styled.div`
  width: ${(props) => `calc(20% * ${props.progress})`};
  height: 3px;
  background: var(--red, #d81921);
  transition: 0.5s ease-in-out;
`;
