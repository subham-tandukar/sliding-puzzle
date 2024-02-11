import React, { useState } from "react";
import Tile from "./Tile";
import { useContext } from "react";
import MainContext from "./context/MainContext";
import SinglePopup from "./SinglePopup";
import Nav from "./Nav";
import { useEffect } from "react";
import $ from "jquery";
import frame from "../images/frame.png";

function SlidingPuzzle() {
  const {
    TILE_COUNT,
    GRID_SIZE,
    BOARD_SIZE,
    canSwap,
    shuffle,
    swap,
    isSolved,
    boardSize,
    setBoardSize,
    levelMode,
    setMode,
    winAudio,
    isUploaded,
    setIsUploaded,
    image,
    setImage,
    click,
    setTypeFile,
  } = useContext(MainContext);

  useEffect(() => {
    const imgUrl = localStorage.getItem("image");
    setImage(imgUrl);
  }, [image]);

  useEffect(() => {
    setMode(true);
  }, []);

  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );

      setTiles(swappedTiles);
    }
  };

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  const handleShuffleClick = () => {
    shuffleTiles();
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  };

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    cursor: isStarted ? "pointer" : "not-allowed",
  };
  const hasWon = isSolved(tiles);
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    setPopup(false);
  }, []);

  useEffect(() => {
    if (hasWon && isStarted) {
      setPopup(true);
    }
  }, [hasWon, isStarted]);

  useEffect(() => {
    setTimeout(() => {
      if (popup) {
        $(".singlePopupBg").addClass("show-popup-bg");
        $(".singlePopup").addClass("show-popup");

        winAudio.play();
      }
    }, 1000);
  }, [popup]);

  function handleImageChange(e) {
    setIsUploaded(true);
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      setTypeFile(file.name);
      let reader = new FileReader();

      reader.onload = function (e) {
        let img = new Image();
        img.onload = function () {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          let maxSize = Math.max(img.width, img.height);
          canvas.width = maxSize;
          canvas.height = maxSize;
          ctx.fillStyle = "black"; // Set background color to black
          ctx.fillRect(0, 0, maxSize, maxSize);
          let offsetX = (maxSize - img.width) / 2;
          let offsetY = (maxSize - img.height) / 2;
          ctx.drawImage(img, offsetX, offsetY);

          let imageDataURL = canvas.toDataURL("image/jpeg"); // You can change the format as needed
          setImage(imageDataURL);
          localStorage.setItem("image", imageDataURL);

          setIsUploaded(false);
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      {isUploaded && (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}
      <div className="content-wrapper">
        <div className="content">
          <Nav />
          <div className="uk-container">
            <div className="game my-5">
              <h5>
                <span className="x">
                  {hasWon && isStarted
                    ? "Puzzle solved 🧠 🎉"
                    : `Mode : ${levelMode}`}
                </span>{" "}
              </h5>

              <div className="sliding-puzzle">
                <div className="board-size">
                  <div>
                    <h4 className="title">Board Size</h4>
                    <div className="board-btn">
                      <div>
                        <input
                          type="radio"
                          id="small"
                          name="size"
                          value="small"
                          checked={boardSize === "small"}
                          onClick={() => click.play()}
                          onChange={(e) => setBoardSize(e.target.value)}
                        />
                        <label htmlFor="small">small</label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          id="normal"
                          name="size"
                          value="normal"
                          onClick={() => click.play()}
                          checked={boardSize === "normal"}
                          onChange={(e) => setBoardSize(e.target.value)}
                        />
                        <label htmlFor="normal">normal</label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          id="big"
                          name="size"
                          value="big"
                          onClick={() => click.play()}
                          checked={boardSize === "big"}
                          onChange={(e) => setBoardSize(e.target.value)}
                        />
                        <label htmlFor="big">big</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="puzzle-board">
                  <ul style={style} className="board">
                    {tiles.map((tile, index) => (
                      <Tile
                        key={tile}
                        index={index}
                        tile={tile}
                        width={pieceWidth}
                        height={pieceHeight}
                        handleTileClick={handleTileClick}
                        isStarted={isStarted}
                        hasWon={hasWon}
                      />
                    ))}
                  </ul>
                </div>

                <div className="choose-photo">
                  <div>
                    {!image ? (
                      <div>
                        <h4 className="title">Choose your own Photo</h4>
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleImageChange}
                        />
                        <label onClick={() => click.play()} htmlFor="image">
                          Choose Photo
                        </label>
                        <p
                          className="uk-text-center uk-text-bold "
                          style={{ lineHeight: "18px" }}
                        >
                          It will be perfect <br /> if the image is square
                          shaped.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="frame">
                          <img src={frame} alt="frame" />
                          <div className="selected-img">
                            <img src={image} alt="Your Photo" />
                          </div>
                        </div>
                        <div className="btn-center">
                          <button
                            onClick={() => {
                              setImage(null);
                              click.play();
                              localStorage.setItem("image", "");
                            }}
                            className="uk-button btn-txt red"
                          >
                            remove photo
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="btn-center">
                {!isStarted ? (
                  <button
                    className="uk-button btn-txt animate"
                    onClick={() => {
                      handleStartClick();
                      click.play();
                    }}
                  >
                    Start game
                  </button>
                ) : (
                  <button
                    className="uk-button btn-txt"
                    onClick={() => {
                      handleShuffleClick();
                      click.play();
                    }}
                  >
                    Shuffle
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      <SinglePopup setPopup={setPopup} handleStartClick={handleStartClick} />
    </>
  );
}

export default SlidingPuzzle;
