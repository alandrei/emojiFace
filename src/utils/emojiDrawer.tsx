import React from "react";
import nose from "../assets/nose.svg";

const drawEmoji = (ctx: any, x: number, y: number, emoji: string = nose) => {
  const size = 50;
  const img = new Image();
  switch (emoji) {
    case "nose":
    default: {
      img.src = nose;
    }
  }
  img.onload = function() {
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  };
};

export default drawEmoji;

export const getVideoDimentions = (video: HTMLVideoElement) => {
  const videoRatio = video.videoWidth / video.videoHeight;
  const elementRatio = window.innerWidth / window.innerHeight;
  return {
    width:
      elementRatio > videoRatio
        ? window.innerHeight * videoRatio
        : window.innerWidth,
    height:
      elementRatio <= videoRatio
        ? window.innerWidth / videoRatio
        : window.innerHeight
  };
};
