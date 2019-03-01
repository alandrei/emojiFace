import React from "react";
import * as posenet from "@tensorflow-models/posenet";

const detector = async () => {
  const net = await posenet.load(0.75);

  const detectPose = async (videoRef: HTMLVideoElement) => {
    if (!videoRef) return [];
    const poses = await net.estimateSinglePose(videoRef, 0.5, true);
    return poses.keypoints.filter(point => point.part === "nose");
  };

  return {
    detectPose
  };
};

export default detector;
