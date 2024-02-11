import React, { useState, useEffect } from "react";
import MainContext from "./MainContext";
import bgMusic from "../../../src/bg.mp3";
import userTurnSound from "../../../src/user.wav";
import computerTurnSound from "../../../src/comp.wav";
import clickSound from "../../../src/click.wav";
import quitSound from "../../../src/quit.wav";
import winSound from "../../../src/win.mp3";
import drawSound from "../../../src/draw.wav";
import loseSound from "../../../src/lose.wav";

const MainState = (props) => {
  const [audio] = useState(new Audio(bgMusic));
  const [userAudio] = useState(new Audio(userTurnSound));
  const [computerAudio] = useState(new Audio(computerTurnSound));
  const [click] = useState(new Audio(clickSound));
  const [quit] = useState(new Audio(quitSound));
  const [winAudio] = useState(new Audio(winSound));
  const [drawAudio] = useState(new Audio(drawSound));
  const [loseAudio] = useState(new Audio(loseSound));
  const [mode, setMode] = useState(false);
  const [music, setMusic] = useState(100);
  const [sound, setSound] = useState(100);

  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");
  const [image, setImage] = useState("");

  const levelMode = localStorage.getItem("level");
  const [boardSize, setBoardSize] = useState("normal");

  const TILE_COUNT =
    levelMode === "easy"
      ? 9
      : levelMode === "normal"
      ? 16
      : levelMode === "hard"
      ? 25
      : null;
  const GRID_SIZE =
    levelMode === "easy"
      ? 3
      : levelMode === "normal"
      ? 4
      : levelMode === "hard"
      ? 5
      : null;
  const BOARD_SIZE =
    boardSize === "small" ? 220 : boardSize === "normal" ? 280 : 340;

  useEffect(() => {
    audio.loop = true;
    audio.play();
    audio.volume = music / 100;
  }, [music]);

  useEffect(() => {
    userAudio.volume = sound / 100;
    computerAudio.volume = sound / 100;
    click.volume = sound / 100;
    quit.volume = sound / 100;
    winAudio.volume = sound / 100;
    drawAudio.volume = sound / 100;
    loseAudio.volume = sound / 100;
  }, [sound]);

  function isSolvable(tiles) {
    let product = 1;
    for (let i = 1, l = TILE_COUNT - 1; i <= l; i++) {
      for (let j = i + 1, m = l + 1; j <= m; j++) {
        product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
      }
    }
    return Math.round(product) === 1;
  }
  function isSolved(tiles) {
    for (let i = 0, l = tiles.length; i < l; i++) {
      if (tiles[i] !== i) {
        return false;
      }
    }
    return true;
  }

  // Get the linear index from a row/col pair.
  function getIndex(row, col) {
    return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
  }

  // Get the row/col pair from a linear index.
  function getMatrixPosition(index) {
    return {
      row: Math.floor(index / GRID_SIZE),
      col: index % GRID_SIZE,
    };
  }

  function getVisualPosition(row, col, width, height) {
    return {
      x: col * width,
      y: row * height,
    };
  }

  function shuffle(tiles) {
    const shuffledTiles = [
      ...tiles
        .filter((t) => t !== tiles.length - 1)
        .sort(() => Math.random() - 0.5),
      tiles.length - 1,
    ];
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
      ? shuffledTiles
      : shuffle(shuffledTiles);
  }

  function canSwap(srcIndex, destIndex) {
    const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
    const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
  }

  function swap(tiles, src, dest) {
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [
      tilesResult[dest],
      tilesResult[src],
    ];
    return tilesResult;
  }

  function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].split("=")[0] !== param) {
          newAdditionalURL += temp + tempArray[i];
          temp = "&";
        }
      }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
  }

  return (
    <MainContext.Provider
      value={{
        audio,
        userAudio,
        computerAudio,
        click,
        quit,
        winAudio,
        drawAudio,
        loseAudio,
        mode,
        setMode,
        music,
        setMusic,
        sound,
        setSound,
        levelMode,
        // setLevelMode,
        TILE_COUNT,
        GRID_SIZE,
        BOARD_SIZE,

        boardSize,
        setBoardSize,

        isSolvable,
        isSolved,
        getIndex,
        getMatrixPosition,
        getVisualPosition,
        shuffle,
        isSolvable,
        canSwap,
        swap,
        updateURLParameter,
        isUploaded,
        setIsUploaded,
        image,
        setImage,
        typeFile, setTypeFile
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainState;
