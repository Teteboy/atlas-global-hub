import { useRef, useState } from "react";
import { ImageIcon, Loader2, Upload } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  aspectClassName?: string;
}

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/uploads", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Upload failed");
  }
  const data = await res.json();
  return data.url as string;
}

export default function ImageUploader({ value, onChange, className, aspectClassName = "aspect-video" }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={className}>
      <div
        className={`relative ${aspectClassName} w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group`}
      >
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ImageIcon className="w-8 h-8" />
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all disabled:cursor-wait"
        >
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <Upload className="w-4 h-4" />
              Replace image
            </span>
          )}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
