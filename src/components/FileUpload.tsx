
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string;
  className?: string;
}

const FileUpload = ({
  onFilesSelected,
  maxFiles = 10,
  acceptedFileTypes = ".pdf",
  className = "",
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf" || acceptedFileTypes.includes(file.name.split('.').pop() || '')
    );
    
    if (droppedFiles.length > 0) {
      const newFiles = [...files, ...droppedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors ${
          dragActive ? "border-pdf-blue bg-blue-50" : "border-gray-300 bg-gray-50"
        } hover:bg-gray-100 cursor-pointer`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedFileTypes}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload size={40} className="text-gray-400 mb-3" />
          <p className="mb-2 text-sm font-semibold text-gray-700">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            PDF (Max {maxFiles} files)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium text-gray-900 mb-2">Uploaded files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex items-center">
                  <FileText size={20} className="text-pdf-blue mr-2" />
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
