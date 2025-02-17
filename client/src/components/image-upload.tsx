import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageCapture: (base64: string) => void;
}

export function ImageUpload({ onImageCapture }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        onImageCapture(base64);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageCapture]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-primary bg-primary/5" : "border-muted"}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Drop your image here</h3>
      <p className="text-sm text-muted-foreground mt-2">
        or click to select a file
      </p>
      <Button variant="outline" className="mt-4">
        Select Image
      </Button>
    </div>
  );
}
