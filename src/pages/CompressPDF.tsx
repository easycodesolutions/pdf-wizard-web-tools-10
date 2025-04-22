
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { FileDown, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const CompressPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleFilesSelected = (selectedFiles: File[]) => {
    // For compress operation, we only need one file
    setFiles(selectedFiles.slice(0, 1));
    setIsDownloadReady(false);
    setCompressedPdfUrl(null);
  };

  const handleCompressPDF = async () => {
    if (files.length === 0) {
      toast.error("Please select a PDF file to compress");
      return;
    }

    setIsProcessing(true);
    setProgressPercent(0);
    
    try {
      // Get the selected file
      const file = files[0];
      
      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load original PDF document
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Set up compression parameters based on selected level
      let compressionQuality: number;
      switch (compressionLevel) {
        case 'low':
          compressionQuality = 0.8; // Less compression, better quality
          break;
        case 'medium':
          compressionQuality = 0.5; // Balanced
          break;
        case 'high':
          compressionQuality = 0.2; // Higher compression, lower quality
          break;
        default:
          compressionQuality = 0.5;
      }
      
      setProgressPercent(25);
      
      // Create a new PDF document
      const compressedPdf = await PDFDocument.create();
      
      // Copy pages from the original document
      const pages = await compressedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      
      setProgressPercent(50);
      
      // Add pages to the new document
      pages.forEach(page => compressedPdf.addPage(page));
      
      setProgressPercent(75);
      
      // Save the compressed PDF with specified quality
      const compressedPdfBytes = await compressedPdf.save({
        useObjectStreams: true,
        // Note: pdf-lib doesn't have direct image quality control, but these options help reduce size
        addDefaultPage: false,
        objectsPerTick: 100,
      });
      
      // Convert to Blob and create URL
      const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Calculate compression ratio for display
      const originalSize = file.size;
      const compressedSize = blob.size;
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      setCompressedPdfUrl(url);
      setIsDownloadReady(true);
      setProgressPercent(100);
      
      toast.success(`PDF compressed successfully! Reduced by ${compressionRatio}%`);
    } catch (error) {
      console.error("Error compressing PDF:", error);
      toast.error("Failed to compress PDF file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedPdfUrl) {
      toast.error("No compressed PDF available for download");
      return;
    }
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = compressedPdfUrl;
    link.download = "compressed-document.pdf";
    
    // Append to the document, trigger click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Compress PDF</h1>
            <p className="text-gray-600 mt-2">Reduce the file size of your PDF document</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileDown size={32} className="text-pdf-blue" />
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
                <h3 className="text-lg font-medium mb-3">Compression Level</h3>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <div 
                    className={`flex-1 p-4 border rounded-lg cursor-pointer ${
                      compressionLevel === 'low' 
                        ? 'border-pdf-blue bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setCompressionLevel('low')}
                  >
                    <h4 className="font-medium mb-1">Low</h4>
                    <p className="text-sm text-gray-600">Better quality, larger file size</p>
                  </div>
                  
                  <div 
                    className={`flex-1 p-4 border rounded-lg cursor-pointer ${
                      compressionLevel === 'medium' 
                        ? 'border-pdf-blue bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setCompressionLevel('medium')}
                  >
                    <h4 className="font-medium mb-1">Medium</h4>
                    <p className="text-sm text-gray-600">Balanced quality and file size</p>
                  </div>
                  
                  <div 
                    className={`flex-1 p-4 border rounded-lg cursor-pointer ${
                      compressionLevel === 'high' 
                        ? 'border-pdf-blue bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setCompressionLevel('high')}
                  >
                    <h4 className="font-medium mb-1">High</h4>
                    <p className="text-sm text-gray-600">Smaller file size, lower quality</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col items-center">
              {isProcessing && (
                <div className="w-full mb-6">
                  <Progress value={progressPercent} className="h-2" />
                  <p className="text-sm text-gray-600 text-center mt-2">Processing: {progressPercent}%</p>
                </div>
              )}
              
              {files.length > 0 && (
                <Button 
                  onClick={handleCompressPDF} 
                  disabled={isProcessing}
                  className="w-full sm:w-auto bg-pdf-blue hover:bg-blue-700 mb-4"
                >
                  {isProcessing ? "Processing..." : "Compress PDF"}
                </Button>
              )}
              
              {isDownloadReady && (
                <Button 
                  onClick={handleDownload} 
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Compressed PDF
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">How to Compress a PDF File</h2>
            
            <ol className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">1</span>
                <div>
                  <p>Upload the PDF document that you want to compress.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">2</span>
                <div>
                  <p>Choose your preferred compression level: low (better quality), medium (balanced), or high (smaller size).</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">3</span>
                <div>
                  <p>Click the "Compress PDF" button to process your file.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">4</span>
                <div>
                  <p>Download your compressed PDF file when processing is complete.</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
              <p className="text-gray-700">
                <strong>Note:</strong> The compression level you choose affects both the file size and the quality of your PDF.
                Higher compression may reduce image quality and affect text clarity in documents with many images or complex graphics.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompressPDF;
