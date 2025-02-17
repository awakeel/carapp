import { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Camera, RotateCcw } from "lucide-react";
import { Card } from "./ui/card";

interface CameraCaptureProps {
  onImageCapture: (base64: string) => void;
}

export function CameraCapture({ onImageCapture }: CameraCaptureProps) {
  const [isCaptured, setIsCaptured] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const base64 = imageSrc.split(",")[1];
      onImageCapture(base64);
      setIsCaptured(true);
    }
  }, [onImageCapture]);

  const retake = useCallback(() => {
    setIsCaptured(false);
  }, []);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 720,
            height: 480,
            facingMode: "environment"
          }}
          className="w-full h-auto"
        />
      </Card>

      <div className="flex justify-center gap-4">
        {!isCaptured ? (
          <Button onClick={capture}>
            <Camera className="mr-2 h-4 w-4" />
            Capture Photo
          </Button>
        ) : (
          <Button onClick={retake} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Take Another
          </Button>
        )}
      </div>
    </div>
  );
}
