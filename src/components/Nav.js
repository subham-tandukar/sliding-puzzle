import React from "react";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import QuitPopup from "./QuitPopup";
import $ from "jquery";
import { useContext } from "react";
import MainContext from "./context/MainContext";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";

const Nav = () => {
  const { setBoardSize, mode, music, setMusic, sound, setSound, click, quit } =
    useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    click.play();
  };
  const handleClosePop = () => {
    $(".quitPopupBg").addClass("show-popup-bg");
    $(".quitPopup").addClass("show-popup");
    quit.play();
  };
  const handleVolume = (event) => {
    setAnchorEl(event.currentTarget);
    click.play();
  };

  const handleVolumeClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <section className="nav-bar pt-3">
        <div className="uk-container">
          <div className="uk-flex uk-flex-around@s uk-flex-between uk-flex-wrap">
            <div>
              <h5>Sliding Puzzle</h5>
            </div>

            <div>
              {mode && (
                <button
                  className="uk-button back me-3"
                  onClick={() => click.play()}
                >
                  <Link
                    to="/home"
                    onClick={() => {
                      setBoardSize("normal");
                      localStorage.setItem("level", "easy");
                    }}
                  >
                    <TiArrowBack
                      uk-tooltip="Go Back"
                      size="3rem"
                      color="#fff"
                    />
                  </Link>
                </button>
              )}
              <button onClick={handleVolume} className="uk-button volume me-3">
                {music > 0 || sound > 0 ? (
                  <BsFillVolumeUpFill uk-tooltip="Volume" size="3rem" />
                ) : (
                  <BsFillVolumeMuteFill uk-tooltip="Volume" size="3rem" />
                )}
              </button>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleVolumeClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="volume-bg">
                  <div>
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <span>{music}</span>
                      <BsFillVolumeMuteFill
                        size="3rem"
                        onClick={() => setMusic(0)}
                        style={{ cursor: "pointer" }}
                      />
                      <Slider
                        aria-label="Volume"
                        value={music}
                        onChange={(e, newValue) => setMusic(newValue)}
                        min={0}
                        max={100}
                      />
                      <BsFillVolumeUpFill
                        size="3rem"
                        onClick={() => setMusic(100)}
                        style={{ cursor: "pointer" }}
                      />
                      <span>Music</span>
                    </Stack>
                  </div>

                  <div>
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <span>{sound}</span>
                      <BsFillVolumeMuteFill
                        size="3rem"
                        onClick={() => setSound(0)}
                        style={{ cursor: "pointer" }}
                      />
                      <Slider
                        aria-label="Volume"
                        value={sound}
                        onChange={(e, newValue) => setSound(newValue)}
                        min={0}
                        max={100}
                      />
                      <BsFillVolumeUpFill
                        size="3rem"
                        onClick={() => setSound(100)}
                        style={{ cursor: "pointer" }}
                      />
                      <span>Sound</span>
                    </Stack>
                  </div>
                </div>
              </Popover>

              <button
                onClick={handleClosePop}
                uk-tooltip="Quit"
                className="uk-button close"
              >
                <h4>X</h4>
              </button>
            </div>
          </div>
        </div>
      </section>
      <QuitPopup handleClose={handleClose} />
    </>
  );
};

export default Nav;
