import React from "react";
import nose from "../assets/nose.svg";

const size = 50;

const drawEmoji = (ctx: any, x: number, y: number, emoji: string = nose) => {
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  };

  switch (emoji) {
    case "nose":
    default: {
      img.src = nose;
    }
  }
};

export default drawEmoji;
