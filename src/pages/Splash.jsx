import styled from "styled-components";
import splashTitle from "../assets/images/splash-new-title.svg";
import splashFrame from "../assets/images/splash-frame.svg";
import splashTiger from "../assets/images/splash-tiger.svg";
import { easeInOut, motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pageVariants } from "../animation/variants";
import API from "../utils/axios";
function Splash() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isClosed = async () => {
      const res = await API.get("/ops/service");
      if (
        res.data.serviceState === "preparing" ||
        res.data.serviceStatus === "closed"
      ) {
        return true;
      }
    };

    const navigateToHome = async () => {
      if (await isClosed()) {
        navigate("/wip");
        return;
      } else {
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    };

    navigateToHome();
  }, [location.pathname]);
  return (
    <Container>
      <White
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.3, ease: easeInOut }}
      />
      <LogoWrapper>
        <SplashTitle
          src={splashTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3, ease: easeInOut }}
        />
        <SplashImage
          src={splashFrame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3, ease: easeInOut }}
        />
        <SplashImage
          src={splashTiger}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.3,
            type: "spring",
            stiffness: 600,
            damping: 15,
          }}
        />
      </LogoWrapper>
    </Container>
  );
}

export default Splash;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--red, #d81921);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 440px;
`;
const LogoWrapper = styled.div`
  position: relative;
  margin-top: 172px;
  width: 181px;
  height: 127px;
`;
const SplashTitle = styled(motion.img)`
  width: 181px;
  height: 127px;
`;
const SplashImage = styled(motion.img)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 80px;
  height: 80px;
`;
const White = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  z-index: 1000;
`;
