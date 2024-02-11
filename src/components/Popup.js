import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useState } from "react";
import View from "./View";
import { useContext } from "react";
import MainContext from "./context/MainContext";

const Popup = ({
  winnerNumber,
  setBoard,
  initial,
  setWinningRow,
  setWin,
  setDraw,
  setWinner,
  setPopup,
  setWinnerNumber,
  draw,
  win,
}) => {
  const { click } = useContext(MainContext);
  const [view, setView] = useState(false);
  const handleRe = () => {
    $(".modalPopupBg").removeClass("show-popup-bg");
    $(".modalPopup").removeClass("show-popup");
    setBoard(initial);
    setWinningRow(null);
    setWin(false);
    setDraw(false);
    setWinner("");
    setWinnerNumber("");
    setPopup(false);
    click.play();
  };

  const handleView = () => {
    $(".modalPopupBg").removeClass("show-popup-bg");
    $(".modalPopup").removeClass("show-popup");
    setView(true);
    click.play();
  };

  const handleShowView = () => {
    $(".modalPopupBg").addClass("show-popup-bg");
    $(".modalPopup").addClass("show-popup");
    setView(false);
  };
  return (
    <>
      <section className="popup-bg modalPopupBg">
        <div className="popup modalPopup">
          <div className="popup-body">
            {win ? (
              <p>{`Congrats Player ${winnerNumber} 🎊`}</p>
            ) : draw ? (
              <p>Try again! It's a draw.</p>
            ) : (
              ""
            )}
          </div>
          <div className="popup-footer mt-5">
            <button className="uk-button" onClick={() => click.play()}>
              <Link to="/home">
                <FaHome color="#fff" size="2rem" uk-tooltip="Home" />
              </Link>
            </button>
            <button
              className="uk-button"
              uk-tooltip="Restart"
              onClick={handleRe}
            >
              <AiOutlineReload size="2rem" />
            </button>
            <button
              className="uk-button"
              uk-tooltip="View"
              onClick={handleView}
            >
              <MdRemoveRedEye size="2rem" />
            </button>
          </div>
          <div className="overlay"></div>
        </div>
      </section>
      {view && <View handleShowView={handleShowView} />}
    </>
  );
};

export default Popup;
