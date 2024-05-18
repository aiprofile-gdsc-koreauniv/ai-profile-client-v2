import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, easeInOut } from "framer-motion";
import firebase from "firebase/compat/app";
import { useRecoilState } from "recoil";
import { Progress } from "../recoil/progress";
import { renderTitle } from "../utils/text";
import { render } from "@testing-library/react";
import { set } from "firebase/database";
function Select() {
  const navigate = useNavigate();
  const [gender, setGender] = useState(null);
  const [style, setStyle] = useState(null);
  const [glasses, setGlasses] = useState(null);

  const [progressBar, setProgressBar] = useRecoilState(Progress);

  useEffect(() => {
    if (!firebase.auth()?.currentUser?.email) navigate("/home");
  }, [firebase.auth()?.currentUser?.email]);

  const btnClickHandler = async () => {
    if (progressBar < 3) {
      setProgressBar(progressBar + 1);
    } else {
      navigate("/upload", {
        state: {
          gender: gender,
          style: style == "none" ? "man" : style,
          glasses: glasses,
        },
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: -1, left: 0, behavior: "smooth" });
    }, 10);
    setProgressBar(1);
  }, []);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, [progressBar]);

  return (
    <Container>
      {isVisible && (
        <SelectTitle
          key={progressBar}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
        >
          <SelectTitleText>{renderTitle(progressBar, gender)}</SelectTitleText>
        </SelectTitle>
      )}
      {isVisible && (
        <Contents
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
        >
          <Column>
            {progressBar == 1 && (
              <>
                <SelectBox
                  selected={gender === "boy"}
                  onClick={() => {
                    setGender("boy");
                  }}
                >
                  남성
                </SelectBox>
                <SelectBox
                  selected={gender === "girl"}
                  onClick={() => {
                    setGender("girl");
                  }}
                >
                  여성
                </SelectBox>
              </>
            )}
            {progressBar === 2 && gender === "boy" && (
              <>
                <SelectBox
                  selected={style == "boy"}
                  onClick={() => {
                    setStyle("boy");
                  }}
                >
                  슬림한 편이에요
                </SelectBox>
                <SelectBox
                  selected={style == "man"}
                  onClick={() => {
                    setStyle("man");
                  }}
                >
                  듬직한 편이에요
                </SelectBox>
                <SelectBox
                  selected={style == "none"}
                  onClick={() => {
                    setStyle("none");
                  }}
                >
                  잘모르겠어요
                </SelectBox>
              </>
            )}
            {progressBar === 2 && gender === "girl" && (
              <>
                <SelectBox
                  selected={style == "short"}
                  onClick={() => {
                    setStyle("short");
                  }}
                >
                  단발이에요
                </SelectBox>
                <SelectBox
                  selected={style == "long"}
                  onClick={() => {
                    setStyle("long");
                  }}
                >
                  장발이에요
                </SelectBox>
              </>
            )}
            {progressBar === 3 && (
              <>
                <SelectBox
                  selected={glasses == true}
                  onClick={() => {
                    setGlasses(true);
                  }}
                >
                  네, 안경을 써요
                </SelectBox>
                <SelectBox
                  selected={glasses == false}
                  onClick={() => {
                    setGlasses(false);
                  }}
                >
                  아뇨, 안경을 쓰지 않아요
                </SelectBox>
              </>
            )}
          </Column>
        </Contents>
      )}
      <Btn
        onClick={btnClickHandler}
        aria-disabled={
          (progressBar === 1 && gender === null) ||
          (progressBar === 2 && style === null) ||
          (progressBar === 3 && glasses === null)
        }
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
        active={
          (progressBar === 1 && gender !== null) ||
          (progressBar === 2 && style !== null) ||
          (progressBar === 3 && glasses !== null)
        }
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
  font-size: 19px;
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
const SelectTitle = styled(motion.div)`
  width: 100%;
`;
const SelectTitleText = styled.div`
  padding: 30px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 30px;
`;
const SelectBox = styled.div`
  width: 320px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 10px 0px;
  font-weight: 600;
  cursor: pointer;

  background: ${(props) => (props.selected ? "black" : "#f3f4f6")};
  color: ${(props) => (props.selected ? "white" : "#505050")};
`;
