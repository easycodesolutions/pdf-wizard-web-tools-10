
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { FileUp, Download } from "lucide-react";

type ConversionFormat = 'word' | 'excel' | 'ppt' | 'jpg' | 'png' | 'txt';

const ConvertPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [format, setFormat] = useState<ConversionFormat>('word');

  const formatOptions: { value: ConversionFormat; label: string; icon: string }[] = [
    { value: 'word', label: 'Word (.docx)', icon: '📝' },
    { value: 'excel', label: 'Excel (.xlsx)', icon: '📊' },
    { value: 'ppt', label: 'PowerPoint (.pptx)', icon: '📊' },
    { value: 'jpg', label: 'JPG Image', icon: '🖼️' },
    { value: 'png', label: 'PNG Image', icon: '🖼️' },
    { value: 'txt', label: 'Text File (.txt)', icon: '📄' },
  ];

  const handleFilesSelected = (selectedFiles: File[]) => {
    // For convert operation, we only need one file
    setFiles(selectedFiles.slice(0, 1));
    setIsDownloadReady(false);
  };

  const handleConvertPDF = () => {
    if (files.length === 0) {
      alert("Please select a PDF file to convert");
      return;
    }

    setIsProcessing(true);
    
    // In a real implementation, you would use a PDF library 
    // to convert the file and generate a download link
    
    // Simulating processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsDownloadReady(true);
    }, 2000);
  };

  const handleDownload = () => {
    // In a real implementation, you would provide the converted file for download
    console.log(`Downloading converted file in ${format} format`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Convert PDF</h1>
            <p className="text-gray-600 mt-2">Transform your PDF into other formats</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileUp size={32} className="text-pdf-blue" />
              </div>
            </div>
            
            <FileUpload
              onFilesSelected={handleFilesSelected}
              maxFiles={1}
              acceptedFileTypes=".pdf"
              className="mb-8"
            />
            
            {files.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Output Format</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formatOptions.map((option) => (
                    <div 
                      key={option.value}
                      className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 ${
                        format === option.value 
                          ? 'border-pdf-blue bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setFormat(option.value)}
                    >
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-col items-center">
              {files.length > 0 && (
                <Button 
                  onClick={handleConvertPDF} 
                  disabled={isProcessing}
                  className="w-full sm:w-auto bg-pdf-blue hover:bg-blue-700 mb-4"
                >
                  {isProcessing ? "Processing..." : `Convert to ${format.toUpperCase()}`}
                </Button>
              )}
              
              {isDownloadReady && (
                <Button 
                  onClick={handleDownload} 
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Converted File
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">How to Convert a PDF File</h2>
            
            <ol className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">1</span>
                <div>
                  <p>Upload the PDF document that you want to convert to another format.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">2</span>
                <div>
                  <p>Choose your desired output format (Word, Excel, PowerPoint, JPG, PNG, or Text).</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">3</span>
                <div>
                  <p>Click the "Convert" button to process your file.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">4</span>
                <div>
                  <p>Download your converted file when processing is complete.</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
              <p className="text-gray-700">
                <strong>Note:</strong> Conversion quality depends on the content and structure of your PDF.
                Complex layouts, tables, and special formatting might not convert perfectly in all formats.
                Text extraction works best with PDF files that contain actual text rather than scanned images.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConvertPDF;
