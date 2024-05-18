import styled from "styled-components";
import share from "../assets/images/share.svg";
import complete from "../assets/images/complete.svg";
import { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Progress } from "../recoil/progress";

function Complete() {
  const navigate = useNavigate();
  const [progressBar, setProgressBar] = useRecoilState(Progress);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!firebase.auth()?.currentUser?.email) navigate("/home");
  }, [firebase.auth()?.currentUser?.email]);
  useEffect(() => {
    setProgressBar(5);
  }, []);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [copied]);
  return (
    <Container>
      <Title
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
      >
        사진 업로드 완료!
      </Title>
      <CompleteImg
        src={complete}
        initial={{ y: 24, opacity: 0, scale: 0.8333 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
      />
      <Desc1
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
      >
        결과 페이지에서
        <br /> 완성된 프로필을 확인하세요!
      </Desc1>

      <RedBtn
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
        onClick={() => {
          navigator.clipboard.writeText("horangstudio.com");
          setCopied(true);
        }}
      >
        친구에게 공유하기
      </RedBtn>
      <Btn
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
        onClick={() => {
          navigate("/home");
        }}
      >
        홈으로 돌아가기
      </Btn>
      {copied ? (
        <ShareImg
          src={share}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        />
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Complete;
const Container = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 51px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  max-width: 440px;
  padding-top: 51px;
`;
const Title = styled(motion.p)`
  color: var(--red, #d81921);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  letter-spacing: -0.456px;
  margin-top: 80px;
`;
const CompleteImg = styled(motion.img)`
  width: 120px;
  height: 120px;
  margin-top: 41px;
`;
const Desc1 = styled(motion.p)`
  color: var(--black, #212121);
  text-align: center;
  /* pretendard sb 20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: 0.38px;
  margin: 47px 0px;
`;
const Desc2 = styled(motion.p)`
  color: var(--black, #212121);

  /* Pretendard md 14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.266px;
  margin-top: 5px;
`;
const Desc2Red = styled.em`
  color: var(--red, #d81921);
  text-align: center;

  /* Pretendard md 14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.266px;
`;
const Desc3 = styled(motion.p)`
  color: var(--grey-2, #9f9f9f);
  text-align: center;
  margin-bottom: 100px;
  /* pretendard md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
  margin-top: 12px;
`;
const Row = styled(motion.div)`
  width: 280px;
  display: flex;
  height: 36px;
  padding: 7px 0;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  margin-top: 82px;
`;
const RowText = styled.p`
  color: var(--grey2, #9f9f9f);

  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background: var(--grey-2, #9f9f9f);
`;
const Btn = styled(motion.div)`
  cursor: pointer;
  display: flex;
  width: calc(100% - 64px);
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 2px solid var(--red, #d81921);
  backdrop-filter: blur(40px);
  color: var(--red, #d81921);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  letter-spacing: 0.38px;
  margin-top: 8px;
`;
const RedBtn = styled(motion.div)`
  cursor: pointer;
  display: flex;
  width: calc(100% - 64px);
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--red, #d81921);
  color: white;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  letter-spacing: 0.38px;
  margin-top: 8px;
`;
const ShareImg = styled(motion.img)``;
