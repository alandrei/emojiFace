import React, { Component } from "react";
import Button from "../components/button";
import noseDetection from "../utils/noseDetector";
import drawEmoji, { getVideoDimentions } from "../utils/emojiDrawer";

interface CameraProps {}
interface CameraState {
  cameras: Array<MediaDeviceInfo>;
  activeCamera: string;
}

class Camera extends React.Component<CameraProps, CameraState> {
  private videoRef: React.RefObject<HTMLVideoElement>;
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private noseDetector: any;
  private activeStream: MediaStream;

  constructor(props: CameraProps) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.activeStream = new MediaStream();
    this.state = {
      cameras: [],
      activeCamera: ""
    };
  }

  async componentDidMount() {
    try {
      const [video, detector] = await Promise.all([
        this.loadCamera(),
        noseDetection()
      ]);
      this.noseDetector = detector;

      this.detectPoseInFrame();
    } catch (e) {
      console.log("Something went wrong");
    }

    window.addEventListener("resize", () => this.updateCanvas());
  }

  loadCamera = async () => {
    const cameras = await this.detectCameras();
    if (cameras && cameras.length > 0) {
      this.setState({ cameras });
      return await this.startStreaming(cameras[0].deviceId);
    }
  };

  detectCameras = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() is not supported.");
      return;
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === "videoinput");
  };

  startStreaming = async (deviceId: string = "") => {
    try {
      this.activeStream.getTracks().forEach(track => track.stop());

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: { exact: deviceId }
        }
      });

      if (this.videoRef.current) {
        this.videoRef.current.srcObject = stream;
        this.activeStream = stream;
      }

      this.setState({
        activeCamera: deviceId
      });

      return this.videoRef.current;
    } catch (e) {
      alert("Could not load camera!");
    }
  };

  detectPoseInFrame = async () => {
    try {
      const poses = await this.noseDetector.detectPose(this.videoRef.current);
      this.updateCanvas(poses);
    } catch (e) {
      console.log("Could not load poses");
    }

    // Loop using requestAnimationFrame
    requestAnimationFrame(this.detectPoseInFrame);
  };

  updateCanvas = (poses: any = []) => {
    if (!this.videoRef.current || !this.canvasRef.current) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const { height, width } = getVideoDimentions(this.videoRef.current);

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d"); // Returns context or null
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;
    this.videoRef.current.width = width;
    this.videoRef.current.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-width, 0);

    ctx.drawImage(this.videoRef.current, 0, 0, width, height);

    poses.map((point: any) => {
      if (point.part === "nose") {
        if (ctx) {
          ctx.restore();
          ctx.beginPath();
          drawEmoji(ctx, point.position.x, point.position.y);
          ctx.fill();
        }
      }
    });
  };

  changeCameraSource = async () => {
    const { cameras, activeCamera } = this.state;

    cameras.forEach((camera, index) => {
      if (camera.deviceId === activeCamera) {
        const nextCameraId = cameras[(index + 1) % cameras.length].deviceId;
        this.startStreaming(nextCameraId);
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.cameras.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100vw",
              zIndex: 1
            }}
          >
            <Button label="Change camera" onClick={this.changeCameraSource} />
          </div>
        )}
        <video
          autoPlay
          width="100%"
          height="100%"
          muted={true}
          className="video-player"
          playsInline
          ref={this.videoRef}
          style={{ transform: "scaleX(-1)", visibility: "hidden" }}
        />
        <canvas
          ref={this.canvasRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
      </div>
    );
  }
}

export default Camera;
