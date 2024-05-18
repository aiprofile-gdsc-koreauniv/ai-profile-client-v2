import styled from "styled-components";
import tobBg from "../assets/images/curtain.svg";
import logo from "../assets/images/logo.svg";
import N from "../assets/images/N .svg";
import google from "../assets/images/google.svg";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { pageVariants } from "../animation/variants";
import Carousel from "../components/Carousel";
import { auth, signInGoogle, signOut } from "../firebase-config";
import firebase from "firebase/compat/app";
import footerLogo from "../assets/images/footer-logo.svg";
import privacyPolicyPdf from "../assets/pdf/privacy-policy.pdf";
import personalInformationAgreementPdf from "../assets/pdf/personal-information-agreement.pdf";
import { CustomFooter } from "../components/CustomFooter";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function Home() {
  const navigate = useNavigate();
  const [showNotice, setShowNotice] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [email, setEmail] = useState(null);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  const handleBtnClick = () => {
    if (!checked) setShowNotice(true);
    else {
      setShowNotice(false);
      setLoginClicked(true);
      if (!firebase.auth()?.currentUser?.email) signInGoogle();
    }
  };
  useEffect(() => {
    if (email && loginClicked) {
      navigate("/select");
    }
  }, [email, loginClicked]);
  console.log(email);

  useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setEmail(firebase.auth()?.currentUser?.email);
      } else {
        setEmail(null);
      }
    });
  }, []);

  return (
    <Container>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3, ease: easeInOut }}
      >
        <TopBgWrapper>
          <TopRow>
            <Logo src={logo} />
            {/* <StartText>시작하기</StartText> */}
          </TopRow>
          <TitleWrapper>
            <Title>호랑이 사진관</Title>
            <Desc>석탑대동제 기념 AI 프로필 제작 서비스</Desc>
          </TitleWrapper>
          <TopBg src={tobBg} />
        </TopBgWrapper>
        <Carousel />
        {/*
        <HowToUse>
          <HowToUseTitle>이용방법</HowToUseTitle>
          <HowToUseColumn>
            <HowToUseRow>
              <HowToUseNum>1</HowToUseNum>
              <HowToUseDescWrapper>
                <HowToUseDesc1>구글 계정으로 로그인해 주세요.</HowToUseDesc1>
              </HowToUseDescWrapper>
            </HowToUseRow>
            <HowToUseRow>
              <HowToUseNum>2</HowToUseNum>
              <HowToUseDescWrapper>
                <HowToUseDesc1>내 정보를 입력해 주세요.</HowToUseDesc1>
              </HowToUseDescWrapper>
            </HowToUseRow>
            <HowToUseRow>
              <HowToUseNum>3</HowToUseNum>
              <HowToUseDescWrapper>
                <HowToUseDesc1>인물 사진을 3장 선택해 주세요.</HowToUseDesc1>
              </HowToUseDescWrapper>
            </HowToUseRow>
            <HowToUseRow>
              <HowToUseNum>4</HowToUseNum>
              <HowToUseDescWrapper>
                <HowToUseDesc1>
                  이메일로 완성된 AI 프로필을 받으세요!
                </HowToUseDesc1>
              </HowToUseDescWrapper>
            </HowToUseRow>
          </HowToUseColumn>
  </HowToUse>*/}
        <StartRow>
          <StartTitle>시작하기</StartTitle>
        </StartRow>
        <StartLineBg>{/* <StartLine /> */}</StartLineBg>
        {firebase.auth()?.currentUser?.email ? (
          <Continue>
            <ContinueBtn
              onClick={() => {
                navigate("/select");
              }}
            >
              <BtnIcon src={N} />
              프로필 사진 새로 만들기
            </ContinueBtn>
            <GoToResultBtn>
              <BtnIcon src={logo} />
              <ResultBtnText
                onClick={() => window.open("https://result.horangstudio.com/")}
              >
                완성된 프로필 보러 가기
              </ResultBtnText>
            </GoToResultBtn>
          </Continue>
        ) : (
          <>
            <CheckboxRow>
              <Checkbox
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked={checked}
                onChange={handleChange}
                sx={{
                  color: "#a9a8aa",
                  "&.Mui-checked": {
                    color: "rgba(216, 25, 33, 1)",
                  },
                }}
              />
              <CheckboxText>개인정보 수집 및 이용에 동의합니다.</CheckboxText>
              <DetailText
                href={personalInformationAgreementPdf}
                target="_blank"
              >
                자세히 보기 &gt;
              </DetailText>
            </CheckboxRow>
            <Continue>
              <GoogleBtn onClick={handleBtnClick}>
                <BtnIcon src={google} />
                <GoogleBtnText>로그인하고 프로필 만들기</GoogleBtnText>
              </GoogleBtn>
              <GoToResultBtn>
                <BtnIcon src={N} />
                <ResultBtnText
                  onClick={() =>
                    window.open("https://result.horangstudio.com/")
                  }
                >
                  완성된 프로필 보러 가기
                </ResultBtnText>
              </GoToResultBtn>
            </Continue>
            <Notice opacity={showNotice ? 1 : 0}>
              서비스를 이용하시려면 개인정보처리방침에 동의하셔야 합니다.{" "}
            </Notice>
          </>
        )}
        {firebase.auth()?.currentUser?.email ? (
          <Logout>
            <DetailText
              onClick={() => {
                auth.signOut();
              }}
            >
              로그아웃 하기
            </DetailText>
          </Logout>
        ) : (
          <></>
        )}
        <CustomFooter />
      </motion.div>
    </Container>
  );
}

export default Home;
const Container = styled.div`
  width: 100%;
  background: #fff;
  max-width: 440px;
`;
const TopBgWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;
const TopBg = styled.img`
  width: 440px;
  height: 190px;
`;
const TopRow = styled.div`
  position: absolute;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  max-width: calc(440px - 32px);
`;
const StartText = styled.p`
  color: var(--white, #fff);

  /* Pretendard md 14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.266px;
`;
const Logo = styled.img`
  width: 30px;
  height: 30px;
`;
const TitleWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 32px;
`;
const Title = styled.p`
  color: var(--white, #fff);
  font-family: SB Aggro;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Desc = styled.p`
  color: var(--white, #fff);
  font-family: SB Aggro;
  font-size: 16px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
`;
const HowToUse = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 23px;
  margin-left: 16px;
  margin-top: 46px;
`;
const HowToUseTitle = styled.p`
  color: var(--black, #212121);

  /* aggro sb 24 */
  font-family: SB Aggro;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 36px */
`;
const HowToUseColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
`;
const HowToUseRow = styled.div`
  display: flex;
`;
const HowToUseNum = styled.p`
  width: 19px;
  color: var(--red, #d81921);
  font-family: SB Aggro;
  font-size: 19px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%; /* 19px */
  margin-top: 6px;
`;
const HowToUseDescWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
`;
const HowToUseDesc1 = styled.p`
  color: var(--black, #212121);

  /* pretendard sb 18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.342px;
`;
const HowToUseDesc2 = styled.p`
  color: var(--black, #212121);

  /* pretendard md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
`;
const StartRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  margin-left: 16px;
  margin-right: 16px;
`;
const StartTitle = styled.p`
  color: var(--red, #d81921);
  /* aggro sb 24 */
  font-family: SB Aggro;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 36px */
`;

const StartLineBg = styled.div`
  width: calc(100% - 32px);
  margin-left: 16px;
  height: 3px;
  flex-shrink: 0;
  background: var(--grey, #d9d9d9);
  margin-top: 1px;
`;
const StartLine = styled.div`
  width: 25%;
  height: 3px;
  flex-shrink: 0;
  background: var(--red, #d81921);
`;
const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 16px;
  gap: 1px;
`;
const CheckboxText = styled.p`
  color: var(--black, #212121);

  /* md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
`;
const DetailText = styled.a`
  cursor: pointer;
  margin-left: 10px;
  color: lightgrey;
  text-decoration: underline;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
`;
const GoogleBtn = styled.div`
  cursor: pointer;
  display: flex;
  width: calc(100% - 64px);
  margin-left: 16px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #f3f4f6;
  font-weight: bold;
`;
const BtnIcon = styled.img`
  width: 23px;
  height: 23px;
`;
const GoogleBtnText = styled.p`
  color: var(--black, #212121);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const ResultBtnText = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const Footer = styled.div`
  width: 100%;
  height: 246px;
  flex-shrink: 0;
  background: var(--light-grey, #ededed);
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 60px;
`;
const FooterContact = styled.div`
  margin-top: 24px;
  margin-left: 31px;
`;
const FooterContactTitle = styled.p`
  color: var(--grey2, #9f9f9f);

  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
  margin-bottom: 4px;
`;
const FooterContactRow = styled.div`
  display: flex;
`;
const FooterContactType = styled.p`
  width: 61px;
  color: var(--grey2, #9f9f9f);

  /* pretendard md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
`;
const FooterContactText = styled.p`
  color: var(--black, #212121);

  /* pretendard md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
`;
const FooterText = styled.p`
  color: var(--black, #212121);

  /* Pretendard md 14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.266px;
  margin-left: 31px;
  margin-top: 78px;
`;
const FooterLink = styled.a`
  color: var(--black, #212121);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.266px;
  text-decoration-line: underline;
`;
const FooterLogo = styled.img`
  margin-top: 8px;
  margin-left: 31px;
  width: 162px;
  height: 27px;
`;
const Notice = styled.p`
  color: var(--red, #d81921);

  /* pretendard md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
  opacity: ${(props) => props.opacity};
  margin-top: 10px;
  margin-left: 32px;
`;
const Continue = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 16px;
`;
const ContinueBtn = styled.div`
  cursor: pointer;
  display: flex;
  width: calc(100% - 64px);
  margin-left: 16px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--red, #d81921);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  color: var(--white, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const LogoutBtn = styled.div`
  cursor: pointer;
  display: flex;
  width: calc(100% - 64px);
  margin-left: 16px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid lightgray;
  backdrop-filter: blur(40px);
  color: var(--grey2, #9f9f9f);
  text-align: center;

  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const GoToResultBtn = styled.div`
  cursor: pointer;
  display: flex;
  width: calc(100% - 64px);
  margin-left: 16px;
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  flex-shrink: 0;
  border-radius: 12px;
  background: #fbe8e9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  color: var(--red, #d81921);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const Logout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0px;
`;
