import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, easeInOut } from "framer-motion";
import firebase from "firebase/compat/app";
import { useRecoilState } from "recoil";
import { Progress } from "../recoil/progress";

function Select() {
  const navigate = useNavigate();
  const [gender, setGender] = useState(null);
  const [style, setStyle] = useState(null);
  const [progressBar, setProgressBar] = useRecoilState(Progress);
  console.log("gender", gender);
  console.log("style", style);
  useEffect(() => {
    if (!firebase.auth()?.currentUser?.email) navigate("/home");
  }, [firebase.auth()?.currentUser?.email]);
  const btnClickHandler = async () => {
    navigate("/upload", { state: { gender: gender, style: style } });
  };
  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: -1, left: 0, behavior: "smooth" });
    }, 10);
  }, []);

  return (
    <Container>
      <Title
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
      >
        내 정보 입력하기
      </Title>
      <Desc
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
      >
        선택하신 정보를 기반으로 정밀한 프로필을 만들 수 있어요.
      </Desc>
      <Contents
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
      >
        <Column>
          <Type>성별</Type>
          <Row>
            <div
              onClick={() => {
                setGender("man");
                setProgressBar(style ? 2 : 1);
              }}
              style={{
                border: gender === "man" ? "3px solid  #D81921" : "none",
                position: "relative",
                height: 144.5,
                width: 144.5,
                borderRadius: 23,
              }}
              selected={gender === "man"}
            >
              {gender === "girl" ? (
                <img
                  src="/images/unselected.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src="/images/man.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <div
              onClick={() => {
                setGender("girl");
                setProgressBar(style ? 2 : 1);
              }}
              selected={gender === "girl"}
              style={{
                border: gender === "girl" ? "3px solid #D81921" : "none",
                position: "relative",
                height: 144.5,
                width: 144.5,
                borderRadius: 23,
              }}
            >
              {gender === "man" ? (
                <img src="/images/unselected.png" />
              ) : (
                <img src="/images/girl.png" />
              )}
            </div>
          </Row>
        </Column>
        <Column>
          <Type>{gender === "girl" ? "스타일" : "이미지"}</Type>
          <Row style={{ justifyContents: "center" }}>
            <ContentsBtn
              onClick={() => {
                setStyle(1);
                setProgressBar(gender ? 2 : 1);
              }}
              selected={style === 1}
            >
              {gender === "girl" ? "단발" : "소년"}
            </ContentsBtn>
            <ContentsBtn
              onClick={() => {
                setStyle(2);

                setProgressBar(gender ? 2 : 1);
              }}
              selected={style === 2}
            >
              {gender === "girl" ? "장발" : "남성"}
            </ContentsBtn>
          </Row>
        </Column>
      </Contents>
      <Btn
        onClick={gender && style != null ? btnClickHandler : null}
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
        active={gender && style != null}
      >
        다음
      </Btn>
    </Container>
  );
}

export default Select;
const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 111px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  max-width: 440px;
  padding-top: 51px;
`;
const Title = styled(motion.p)`
  color: var(--red, #d81921);

  /* pretendard bold 24 */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  letter-spacing: -0.456px;
  margin-top: 65px;
`;
const Desc = styled(motion.p)`
  color: var(--dark-grey, #505050);
  text-align: center;

  /* Pretendard md 14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.266px;
`;
const Contents = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  margin-top: 40px;
`;
const Row = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Type = styled.div`
  width: 55px;
  color: var(--black, #212121);
  text-align: center;
  padding: 5px;
  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
  text-align: left;
  margin-top: 7px;
`;
const ContentsBtn = styled.div`
  cursor: pointer;
  display: flex;
  padding: 40px 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${(props) => (props.selected ? "#fff" : "#f5f5f5")};
  color: ${(props) => (props.selected ? "#D81921" : "#505050")};
  text-align: center;

  /* Pretendard md 14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.266px;

  border: ${(props) =>
    props.selected ? "2px solid #D81921" : "2px solid transparent"};
`;
const RaceGrid = styled.div`
  display: flex;
  gap: 8px;
`;
const RaceBtn = styled.div`
  cursor: pointer;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${(props) => (props.selected ? "#fff" : "#f5f5f5")};
  border: ${(props) =>
    props.selected ? "2px solid #D81921" : "2px solid transparent"};
`;
const RaceImg = styled.img`
  width: 41.6px;
  height: 35.533px;
  flex-shrink: 0;
`;
const Btn = styled(motion.div)`
  max-width: 408px;
  position: fixed;
  bottom: 0;
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  display: flex;
  width: calc(100% - 32px);
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: ${(props) => (props.active ? "#d81921" : "#D9D9D9")};
  backdrop-filter: blur(40px);
  color: var(--white, #fff);
  text-align: center;

  /* pretendard sb 20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: 0.38px;
`;
