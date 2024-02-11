import React from "react";
import { Motion, spring } from "react-motion";
import { useContext } from "react";
import MainContext from "./context/MainContext";

function Tile(props) {
  const {
    TILE_COUNT,
    GRID_SIZE,
    BOARD_SIZE,
    getMatrixPosition,
    getVisualPosition,
    boardSize,
    image,
    click
  } = useContext(MainContext);
  const { tile, index, width, height, handleTileClick, isStarted, hasWon } =
    props;
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${image})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${
      (100 / (GRID_SIZE - 1)) * Math.floor(tile / GRID_SIZE)
    }%`,
    transition: "border 0.5s linear",
  };

  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y),
  };

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            pointerEvents:
              hasWon && isStarted ? "none" : isStarted ? "auto" : "none",
            border:
              hasWon && isStarted ? "1px solid transparent" : "1px solid #fff",
            // Is last tile?
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          className="tile"
          onClick={() => {
            handleTileClick(index);
            click.play();
          }}
        >
          <span
            style={{
              fontSize:
                boardSize === "small"
                  ? "10px"
                  : boardSize === "normal"
                  ? "11px"
                  : "12px",
            }}
            className={`${
              hasWon && isStarted && image ? "uk-hidden" : image ? "badge" : ""
            }`}
          >{`${tile + 1}`}</span>
        </li>
      )}
    </Motion>
  );
}

export default Tile;
