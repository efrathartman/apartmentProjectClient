import { useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const ImageSlider=({slides})=>{
    console.log(slides);
    const [currentIndex,setCurrentIndex]=useState(0)
    console.log(slides[currentIndex]);
    const leftArrowStyled={
        position:"absolute",
        top:"50%",
        transform:"translate(0, -50%)",
        left:"32px",
        fontSize:"45px",
        color:"#fff",
        zIndex:1,
        cursor:"pointer",
      }
      const rightArrowStyled={
        position:"absolute",
        top:"50%",
        transform:"translate(0, -50%)",
        rigth:"32px",
        fontSize:"45px",
        color:"#fff",
        zIndex:1,
        cursor:"pointer",
      }
      const dotsContauner={
        display:"flex",
        justifyContent:"center",
      }
      const dotsStyled={
        margin:"0 3px",
        cursor:"pointer",
        fontSize:"70px"
      }
      const Previous=()=>{
        const isFirstSlide=currentIndex===0;
        const newIndex=isFirstSlide? slides.length-1:currentIndex-1;
        setCurrentIndex(newIndex)
      }
      const Next=()=>{
        const isLastSlide=currentIndex===slides.length-1;
        const newIndex=isLastSlide? 0:currentIndex+1;
        setCurrentIndex(newIndex)
      }
    const  goToSlide=(slideIndex)=>{
        setCurrentIndex(slideIndex);
    };

    return (

      <div style={{height:"100%",position:"relative" }}>
         <div style={leftArrowStyled} onClick={Previous}>
            <ArrowBackIosIcon/>
         </div>
        <div style={rightArrowStyled} onClick={Next}>
            <ArrowForwardIosIcon/>
             </div> 
        <div style={{width:"100%",height:"100%",borderRadius:"10px",backgroundSize:"cover",backgroundPosition:"center",backgroundImage:`url(${slides[currentIndex].img})`} }></div>
        <div style={dotsContauner}>
            {slides.map((slide,slideIndex)=>(
             <div key={slideIndex} style={dotsStyled} onClick={()=>goToSlide(slideIndex)}>.</div>
))}
        </div>
      
      </div>
      
    )
}
export default ImageSlider; 