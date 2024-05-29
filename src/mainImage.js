import React from "react";
import oneImg from "./main.jpg"
import Typewriter from "typewriter-effect";
import { colors } from "@mui/material";
// import './homepage.css'

const MainImage = () => {
  const a=["ברוכים הבאים <br/> לנופש מהחלומות<br/> מגוון דירות ממרחב אזורים בארץ "]
  return (
    <div className="contain-home-page" style={{marginTop:"68px",fontSize:"xx-large"}}  >
      {/* style={{marginTop:"100px"}} */}
      {/* <img id="a" src={oneImg} style={{ width: "95pc", height: "43.5pc" }} >
     
      </img>

       <Typewriter 
    
      options={{
        strings:['ברוכים הבאים לנופש מהחלומות'],
        autoStart:true,
        loop:true
        
        }}>
       
        
      </Typewriter> */}
      
     <div  style={{ position: 'relative', width: '100%' }}>
     <img id="a" src={oneImg} style={{ width: "95pc", height: "38.8pc" ,opacity: "0.5" }} />
     <div style= {{ position: 'absolute', top: 0, left: 0, width: '100%',right:"60px" ,marginTop:"150px",fontSize:"150%"}}>
  <Typewriter
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px' }}
    options={{
      strings: a,
      autoStart: true,
      loop: true
    }}
  />

 
</div>
</div>

      {/* <p style={{color:"olive"}}>hufhudhfu shfusgduf</p> */}

      {/* <div className="home-page-div">

        <p>ברוך הבא לאתר המוביל שלנו!
          <br />
          למציאת דירת נופש מושלמת לחופשה בלתי נשכחת!
          <br />
          דירות ב
          <Typewriter
            className="typing-text"
            options={{
              strings: ['דרום', 'מרכז', 'צפון'],
              autoStart: true,
              loop: true
            }}></Typewriter>
        </p>

      </div> */}
    </div>
    //     <div>
    // <Typewriter

    //   options={{
    //     strings: ['Hello', 'World'],
    //     autoStart: true,
    //     loop: true,
    //   }}
    // />
    //   </div>


  )
}
export default MainImage;