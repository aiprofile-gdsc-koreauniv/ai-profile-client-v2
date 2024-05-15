import React from "react";
import styled from "styled-components";
import privacyPolicy from "../assets/pdf/privacy-policy.pdf";
export const CustomFooter = () => {
  return (
    <Footer>
      <FooterContact>
        <FooterContactTitle>
          <img src="/logo/logo.svg" style={{ width: 20, marginRight: 10 }} />
          Google Developer Student Clubs
        </FooterContactTitle>
        <FooterUniversityText> Korea University</FooterUniversityText>
        <FooterText>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FooterLink href="/" target="_blank">
              GDSC KU
            </FooterLink>
            <span style={{ margin: "0 10px" }}>|</span>
            <FooterLink href="/" target="_blank">
              GDSC KU Projects
            </FooterLink>
            <span style={{ margin: "0 10px" }}>|</span>

            <FooterLink
              href={privacyPolicy}
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보처리방침
            </FooterLink>
          </div>
        </FooterText>
        <FooterContactRow>
          <FooterContactType>Contact </FooterContactType>
          <FooterContactText>gdsc.koreauniv@gmail.com</FooterContactText>
        </FooterContactRow>
      </FooterContact>
    </Footer>
  );
};

const Footer = styled.div`
  width: 100%;
  height: 246px;
  flex-shrink: 0;
  background: var(--light-grey, #ededed);
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 60px;
  color: var(--grey2, #9f9f9f);
  font-family: Pretendard;
`;
const FooterContact = styled.div`
  margin-top: 24px;
  margin-left: 31px;
`;
const FooterContactTitle = styled.p`
  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  height: 10px;
  margin-bottom: 20px;
  letter-spacing: -0.304px;
  color: gray;
`;
const FooterContactRow = styled.div`
  display: flex;
  height: 25px;
`;
const FooterContactType = styled.p`
  width: 61px;

  /* pretendard md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
`;
const FooterContactText = styled.p`
  /* pretendard md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
`;
const FooterText = styled.div`
  color: var(--grey2, #9f9f9f);
  /* Pretendard md 14 */
  font-family: Pretendard;
  font-size: 12px;
  line-height: 150%;

  padding: 10px 0px;
`;
const FooterUniversityText = styled.div`
  font-size: 10px;
  color: gray;
  margin-left: 10px;
`;
const FooterLink = styled.a`
  color: var(--grey2, #9f9f9f);
  text-decoration: none;
`;
const FooterLogo = styled.img`
  margin-top: 8px;
  margin-left: 31px;
  width: 162px;
  height: 27px;
`;
