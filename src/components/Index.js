import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Progress from "./Progress";
import $ from "jquery";
import bg from "../images/bg.png";
import { BsPlayCircle } from "react-icons/bs";
import MainContext from "./context/MainContext";
import { useContext } from "react";
import { useEffect } from "react";

const Index = () => {
  const { audio, setMusic, setSound, click } = useContext(MainContext);
  const navigate = useNavigate();
  const handlePlay = () => {
    localStorage.setItem("image", "");
    click.play();
    $(".index-wrapper").fadeOut(700);
    setTimeout(() => {
      $(".bg .overlay").fadeIn(1000);
      $(".bg .overlay").addClass("bg-light");
      $(".progress-bar").fadeIn(1000);
    }, 700);

    setTimeout(() => {
      $(".bg").fadeOut(1000);
    }, 5350);
    setTimeout(() => {
      // navigate("/sliding-own-puzzle");
      navigate("/home");
      $(".bg").fadeOut(1000);
      audio.play();
      setMusic(100);
      setSound(100);
    }, 6000);
  };

  useEffect(() => {
    audio.pause();
  }, []);

  return (
    <>
      <div className="bg">
        <div className="content">
          <>
            <div className="progress-bar">
              <Progress />
            </div>

            <div className="index-wrapper">
              <img
                src={bg}
                alt=""
                style={{ width: "180px", display: "block", margin: "0 auto" }}
              />
              <h5>Sliding Puzzle</h5>
              <p className="uk-text-center" style={{color:"#fff"}}>Slide your own puzzle</p>

              <div className="buttons">
                <button onClick={handlePlay} className="blob-btn">
                  <Link to className="d-flex">
                    Play Now <BsPlayCircle className="ms-2" size="1rem" />{" "}
                  </Link>
                  <span className="blob-btn__inner">
                    <span className="blob-btn__blobs">
                      <span className="blob-btn__blob"></span>
                      <span className="blob-btn__blob"></span>
                      <span className="blob-btn__blob"></span>
                      <span className="blob-btn__blob"></span>
                    </span>
                  </span>
                </button>
                <br />

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur
                        in="SourceGraphic"
                        result="blur"
                        stdDeviation="10"
                      ></feGaussianBlur>
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                        result="goo"
                      ></feColorMatrix>
                      <feBlend
                        in2="goo"
                        in="SourceGraphic"
                        result="mix"
                      ></feBlend>
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default Index;
