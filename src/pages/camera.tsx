import React, { Component } from "react";
import Button from "../components/button";
import detector from "../utils/noseDetector";
import drawEmoji from "../utils/emojiDrawer";

interface CameraProps {}
interface CameraState {
  cameras: Array<MediaDeviceInfo>;
  activeCamera: string;
}

class Camera extends React.Component<CameraProps, CameraState> {
  private videoRef: React.RefObject<HTMLVideoElement>;
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private noseDetector: any;

  constructor(props: CameraProps) {
    super(props);
    this.state = {
      cameras: [],
      activeCamera: ""
    };
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  async componentDidMount() {
    const cameras = await this.getCameras();
    this.noseDetector = await detector();
    if (cameras && cameras.length > 0) {
      await this.loadCamera(cameras[0].deviceId);
      this.setState({
        cameras,
        activeCamera: cameras[0].deviceId
      });
    }
    this.detectPoseInFrame();
  }

  getCameras = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() is not supported.");
      return;
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === "videoinput");
  };

  detectPoseInFrame = async () => {
    let canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D | null,
      videoWidth: number,
      videoHeight: number;

    if (!this.videoRef.current || !this.canvasRef.current) return;

    const poses = await this.noseDetector.detectPose(this.videoRef.current);

    canvas = this.canvasRef.current;
    ctx = canvas.getContext("2d");
    videoWidth = window.innerWidth;
    videoHeight = window.innerHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    this.videoRef.current.width = videoWidth;
    this.videoRef.current.height = videoHeight;

    poses.forEach((point: any) => {
      if (point.part === "nose") {
        if (ctx) {
          ctx.clearRect(0, 0, videoWidth, videoHeight);
          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-videoWidth, 0);

          if (this.videoRef.current)
            ctx.drawImage(this.videoRef.current, 0, 0, videoWidth, videoHeight);
          ctx.restore();
          ctx.beginPath();
          drawEmoji(ctx, point.position.x, point.position.y);
          ctx.fill();
        }
      }
    });

    requestAnimationFrame(this.detectPoseInFrame);
  };

  loadCamera = async (deviceId: string = "") => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId }
    });

    if (this.videoRef.current) {
      this.videoRef.current.srcObject = stream;
      this.videoRef.current.play();
    }

    return stream;
  };

  changeCameraSource = async () => {
    const { cameras, activeCamera } = this.state;
    cameras.forEach((camera, index) => {
      if (camera.deviceId === activeCamera) {
        const nextCameraId = cameras[(index + 1) % cameras.length].deviceId;
        this.loadCamera(nextCameraId);
        this.setState({ activeCamera: nextCameraId });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.cameras.length > 1 && (
          <Button
            label="Change camera"
            onClick={this.changeCameraSource}
            absolute
          />
        )}
        <video
          autoPlay
          width="100%"
          height="100%"
          muted={true}
          className="video-player"
          playsInline
          ref={this.videoRef}
          style={{ transform: "scaleX(-1)", display: "none" }}
        />
        <canvas
          ref={this.canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
    );
  }
}

export default Camera;
