import React from "react";
import * as posenet from "@tensorflow-models/posenet";

const detector = async () => {
  const net = await posenet.load(0.75);

  const detectPose = async (videoRef: HTMLVideoElement) => {
    try {
      const poses = await net.estimateSinglePose(videoRef, 0.5, true);

      // if (isNaN(poses.score)) console.log("NaN pose detected!");

      // Avoid 0 and NaN scores
      return (
        (poses.score > 0 &&
          poses.keypoints.filter(point => point.part === "nose")) ||
        []
      );
    } catch (e) {
      console.log("EstimateSinglePose() failed!");
    }
  };

  return {
    detectPose
  };
};

export default detector;
