import React, { useContext } from "react";
import { TiTick } from "react-icons/ti";
import $ from "jquery";
import MainContext from "./context/MainContext";

const QuitPopup = ({ handleClose }) => {
  const { click } = useContext(MainContext);
  const handleClosePop = () => {
    $(".quitPopupBg").removeClass("show-popup-bg");
    $(".quitPopup").removeClass("show-popup");
    click.play();
  };
  return (
    <>
      <section className="popup-bg quitPopupBg">
        <div className="popup quitPopup">
          <div className="popup-body">
            <p>Are you sure you want to Quit?</p>
          </div>
          <div className="popup-footer mt-5">
            <button onClick={handleClose} className="uk-button yes">
              <TiTick size="2rem" />
            </button>
            <button onClick={handleClosePop} className="uk-button no">
              <h4>X</h4>
            </button>
          </div>
          <div className="overlay"></div>
        </div>
      </section>
    </>
  );
};

export default QuitPopup;
