import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import styled from "styled-components";
export const Copy = () => {
  return (
    <CopyDiv initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <CopyText>
        링크를 복사했어요!
        <CheckCircleIcon />
      </CopyText>
    </CopyDiv>
  );
};
const CopyDiv = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const CopyText = styled.div`
  width: 150px;
  padding: 10px 20px;
  background: black;
  color: white;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
