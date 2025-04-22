
import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Printer, Save } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PrintPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setProgress(0);
    setPreviewUrl(null);
    
    if (selectedFiles.length > 0) {
      const url = URL.createObjectURL(selectedFiles[0]);
      setPreviewUrl(url);
    }
  };

  const handlePrint = () => {
    if (files.length === 0) {
      toast.error("Please upload a PDF file first");
      return;
    }

    setProcessing(true);
    setProgress(0);

    // Mock progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setProcessing(false);
          
          // After "processing", trigger print dialog
          if (previewUrl) {
            const printWindow = window.open(previewUrl);
            if (printWindow) {
              setTimeout(() => {
                printWindow.print();
                toast.success("Print dialog opened");
              }, 1000);
            } else {
              toast.error("Unable to open print dialog. Please check your popup blocker settings.");
            }
          }
          
          return 100;
        }
        return newValue;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Print PDF</h1>
            <p className="text-gray-600">Print your PDF documents with custom settings</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Upload PDF</h2>
              <FileUpload 
                onFilesSelected={handleFilesSelected}
                maxFiles={1}
                acceptedFileTypes=".pdf"
              />
              
              {processing && (
                <div className="mt-6">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Preparing for print... {progress}%
                  </p>
                  <Progress value={progress} />
                </div>
              )}
              
              <div className="mt-6">
                <Button
                  onClick={handlePrint}
                  disabled={files.length === 0 || processing}
                  className="w-full"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Document
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">PDF Preview</h2>
              {previewUrl ? (
                <div className="h-80 border rounded">
                  <iframe 
                    src={previewUrl} 
                    title="PDF Preview" 
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="h-80 bg-gray-100 rounded flex flex-col items-center justify-center">
                  <p className="text-gray-500 text-center">
                    Upload a PDF to preview it here
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Printing Tips</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>For best results, ensure your PDF is optimized for printing.</li>
              <li>Check your printer settings for proper paper size and orientation.</li>
              <li>Consider using print preview to ensure everything looks right.</li>
              <li>For large documents, you may want to print in batches.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrintPDF;
