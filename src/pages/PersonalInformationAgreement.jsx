import styled from "styled-components";
import close from "../assets/images/close.svg";
import { useNavigate } from "react-router-dom";
function PersonalInformationAgreement() {
  const navigate = useNavigate();
  return (
    <Container>
      <Topbar>
        <Close
          src={close}
          onClick={() => {
            navigate("/home");
          }}
        />
        <Title>[GDSC KU] 개인정보 수집이용 동의서</Title>
      </Topbar>
      <Text></Text>
    </Container>
  );
}

export default PersonalInformationAgreement;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  max-width: 440px;
  overflow: scroll;
`;
const Topbar = styled.div`
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: 0px 4px 8px 5px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 4px;
`;
const Close = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-left: 16px;
`;
const Title = styled.p`
  color: #000;

  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
  color: #000;

  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const Text = styled.p`
  width: calc(100% - 64px);
  margin-left: 32px;
  margin-right: 32px;
  margin-top: 28px;
  color: var(--black, #212121);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.266px;
`;
