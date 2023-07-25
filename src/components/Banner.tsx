import { Carousel } from "react-responsive-carousel";
import sliderImg_1 from "../components/images/slider/sliderImg_1.jpg";
import sliderImg_2 from "../components/images/slider/sliderImg_2.jpg";
import sliderImg_3 from "../components/images/slider/sliderImg_3.jpg";
import sliderImg_4 from "../components/images/slider/sliderImg_4.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <div className={"relative"}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <Image priority={true} src={sliderImg_1} alt={"sliderImg_1"} />
        </div>
        <div>
          <Image src={sliderImg_2} alt={"sliderImg_2"} />
        </div>
        <div>
          <Image src={sliderImg_3} alt={"sliderImg_3"} />
        </div>
        <div>
          <Image src={sliderImg_4} alt={"sliderImg_4"} />
        </div>
      </Carousel>
      <div
        className={
          "w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"
        }
      ></div>
    </div>
  );
};
export default Banner;
