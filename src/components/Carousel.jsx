import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sample1 from "../assets/images/sample1.png";
import sample2 from "../assets/images/sample2.png";
import sample3 from "../assets/images/sample3.png";
import sample4 from "../assets/images/sample4.png";
import sample5 from "../assets/images/sample5.png";

function Carousel() {
  const settings = {
    centerMode: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "105px",
    autoplay: true,
    autoplaySpeed: 1200,
  };
  const cards = [sample1, sample2, sample3, sample4, sample5];
  return (
    <CustomSlider {...settings}>
      {cards.map((card, idx) => (
        <SlideWrapper key={idx + "img"}>
          <Slide src={card} />
        </SlideWrapper>
      ))}
    </CustomSlider>
  );
}

export default Carousel;
const CustomSlider = styled(Slider)`
  width: 100%;
  margin-top: 56px;
  margin-bottom: 30px;
  max-width: 440px;
`;
const SlideWrapper = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;
const Slide = styled.img`
  display: flex;
  width: 100%;
  object-fit: cover;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
