import styled from "styled-components";
import TopBar from "../components/TopBar";
import uploadNotice from "../assets/images/upload-notice.svg";
import tiger from "../assets/images/tiger.svg";
import Lottie from "lottie-react";
import loadingAnimationData from "../assets/lottie/loading.json";
import { useEffect, useRef, useState } from "react";
import API from "../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion, easeInOut } from "framer-motion";
import firebase from "firebase/compat/app";
import { useRecoilState } from "recoil";
import { Progress } from "../recoil/progress";
function Upload() {
  const navigate = useNavigate();
  const location = useLocation();
  const imageInput = useRef(null);
  const [beforeUpload, setBeforeUpload] = useState(true);
  const [images, setImages] = useState([]);
  const [imagesLength, setImagesLength] = useState(null);
  const [progressBar, setProgressBar] = useRecoilState(Progress);
  useEffect(() => {
    if (!firebase.auth()?.currentUser?.email) navigate("/home");
  }, [firebase.auth()?.currentUser?.email]);
  const btnClickHandler = async () => {
    imageInput.current.click();
  };
  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: -1, left: 0, behavior: "smooth" });
    }, 10);
  }, []);
  useEffect(() => {
    setProgressBar(4);
  }, []);
  const convertToJPEG = (file) => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const reader = new FileReader();
      reader.onload = (e) => {
        img.onload = () => {
          let ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            0.95
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };
  const onChangeFile = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    var fileArr = e.target.files;
    if (fileArr.length !== 3) {
      toast.error("3장의 사진을 선택해주세요.", {
        style: {
          wordBreak: "keep-all",
          color: "#000",
        },
        id: 1,
      });
      return;
    }
    setBeforeUpload(false);
    let fileURLs = [];
    setImagesLength(fileArr.length);
    for (let i = 0; i < fileArr.length; i++) {
      let file = fileArr[i];
      const jpegFile = await convertToJPEG(file);
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setImages([...fileURLs]);
      };
      reader.readAsDataURL(jpegFile);
    }
  };
  const uploadImg = async () => {
    try {
      const token = await firebase.auth()?.currentUser?.getIdToken();
      const res = await API.post(
        "/i2i/source",
        {
          email: firebase.auth()?.currentUser?.email,
          images: images,
          gender: location.state.gender,
          style: location.state.style,
          glasses: location.state.glasses,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res) navigate("/complete");
      else if (res.status === 403) {
        toast.error("한 계정당 3회까지 이용할 수 있어요.", {
          style: {
            wordBreak: "keep-all",
            color: "#000",
          },
          id: 2,
        });
        setBeforeUpload(true);
      } else {
        toast.error("문제가 발생했어요.", {
          style: {
            wordBreak: "keep-all",
            color: "#000",
          },
          id: 2,
        });
        setBeforeUpload(true);
      }
    } catch (e) {
      console.error(e);
      toast.error("문제가 발생했어요.", {
        style: {
          wordBreak: "keep-all",
          color: "#000",
        },
        id: 2,
      });
      setBeforeUpload(true);
    }
  };
  useEffect(() => {
    if (images.length === imagesLength) {
      uploadImg();
    }
  }, [images]);
  return (
    <Container>
      {beforeUpload ? (
        <>
          <UploadDiv
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
          >
            <UploadText>
              <div>
                이제 사진을 <br />
                업로드해주세요
              </div>
            </UploadText>
          </UploadDiv>
          <Tip
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
          >
            <TipText>프로필이 잘 만들어지는 사진 팁</TipText>
          </Tip>
          <Center
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
          >
            <TextsWrapper>
              <Text>
                얼굴이 <Bold>선명하고 크게</Bold> 나온 사진을 골라주세요
              </Text>
              <SubText>
                뿌옇거나 배경이 어두운 사진은 AI 가 인식하기 어려워요
              </SubText>
              <Text>
                얼굴에 <Bold>안경을 제외한 다른것</Bold>을 얹지 말아주세요
              </Text>
              <SubText>
                모자, 마스크, 선글라스, 심한 그림자는 정확한 얼굴 인식을
                방해해요
              </SubText>
              <Text>
                본인이 <Bold>잘 나왔다고 생각하는 사진</Bold>을 올려주세요
              </Text>
              <SubText>
                단, 너무 과한 보정이나 왜곡이 적용된 사진은 피해주세요
              </SubText>
              <Text>
                한 사진에 <Bold>두 명 이상 나온 사진</Bold>은 사용하실 수 없어요
              </Text>
              <SubText>한 프로젝트에는 한 명의 얼굴만 인식시켜주세요</SubText>
            </TextsWrapper>
            <Profile src={uploadNotice} />
          </Center>
          <Btn
            onClick={btnClickHandler}
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
          >
            사진 3장 업로드하기
          </Btn>
          <input
            type="file"
            id="file"
            ref={imageInput}
            style={{ display: "none" }}
            onChange={onChangeFile.bind(this)}
            accept="image/*"
            multiple
          />
        </>
      ) : (
        <>
          <UploadDiv
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
          >
            <UploadText>
              <div>거의 다 왔어요!</div>
            </UploadText>
          </UploadDiv>
          <Row>
            <RowText>
              호랑이가 사진을 확인하는 동안
              <br /> 종료하거나 이동하지 말아주세요!
            </RowText>
          </Row>
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
          >
            <Tiger src={tiger} />
            <CustomLottie animationData={loadingAnimationData} />
          </motion.div>
        </>
      )}
      <Toaster />
    </Container>
  );
}

export default Upload;
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
  margin-top: 80px;
`;
const Center = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
  margin-top: 25px;
`;
const Profile = styled.img``;
const TextsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Text = styled.div`
  color: var(--dark-grey, #505050);
  margin-top: 5px;
  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const Bold = styled.em`
  color: var(--black, #212121);

  /* pretendard bold 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.304px;
`;
const Btn = styled(motion.div)`
  max-width: 408px;
  position: fixed;
  bottom: 0;
  cursor: pointer;
  display: flex;
  width: calc(100% - 32px);
  padding: 18px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: var(--red, #d81921);
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
const Title2 = styled(motion.p)`
  color: var(--black, #212121);

  /* pretendard bold 24 */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  letter-spacing: -0.456px;
  margin-top: 80px;
`;
const Tiger = styled.img`
  width: 88px;
  height: 74px;
  margin-top: 64px;
`;
const Desc = styled.p`
  color: var(--dark-grey, #505050);

  /* pretendard sb 16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.304px;
`;
const Row = styled.div`\
width: 100%;

`;
const RowText = styled.p`
  color: var(--grey-2, #9f9f9f);
  padding: 10px 30px;
  /* md 14 */
  font-family: Pretendard;
  font-size: 17px;
  color: darkslategrey;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.266px;
`;
const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background: var(--grey-2, #9f9f9f);
`;
const CustomLottie = styled(Lottie)`
  width: 80px;
  margin-top: 30px;
`;
const SubText = styled.p`
  color: darkslategrey;
  /* pretendard md 12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.228px;
`;
const UploadDiv = styled(motion.div)`
  width: 100%;
`;
const UploadText = styled.div`
  padding: 10px 30px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 40px;
  margin-top: 30px;
`;
const Tip = styled(motion.div)`
  width: 100%;
`;
const TipText = styled.div`
  background: #fbe8e9;
  width: fit-content;
  margin-left: 30px;
  padding: 5px 10px;
  border-radius: 7px;
  color: var(--red, #d81921);
  font-family: Pretendard;
  font-weight: 600;
  font-size: 15px;
`;
