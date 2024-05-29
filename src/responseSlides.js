import { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './swiperResponse.css';
import  HorizontalRuleIcon  from "@mui/icons-material/HorizontalRule";


const ResponseSlides = ({ slides }) => {
 /* console.log(slides, "popop");
  // const objects = ["object1", "object2", "object3", "object4", "object5", "object6"]; // Sample objects array
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((startIndex + 1) % slides.length);
    }, 2000); // Adjust the delay time as needed (1000ms = 1 second)

    return () => clearInterval(interval);
  }, [startIndex, slides.length]);

  const displayedObjects = [];

  for (let i = startIndex; displayedObjects.length < 3; i++) {
    displayedObjects.push(slides[i % slides.length]);
  }*/

  return (
    <div className="swiper-container" style={{ textAlign: "center" }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        //centeredSlides={true}
        autoplay={{
          delay: 2500,
          //disableOnInteraction: false,
        }}
        
        // pagination={{
        //   clickable: true,
        // }}
        loop={true}
        navigation={true}
        centeredSlides={true}
        modules={[Autoplay, Pagination, Navigation]}
        //onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {slides.map((object, index) => (
          <SwiperSlide>
          <div style={{  width: "230px",height:"150px", border: "2px solid olive",borderRadius:"15px", margin: "30px" }}>
            <p key={index}>{object.description}</p>
           <HorizontalRuleIcon sx={{color:"olive"}}/>
            <p key={index}>{object.user.name}</p>
          </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );

}
export default ResponseSlides; 