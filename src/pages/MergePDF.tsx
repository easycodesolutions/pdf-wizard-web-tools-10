
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Merge, Download } from "lucide-react";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setIsDownloadReady(false);
  };

  const handleMergePDFs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);
    
    // In a real implementation, you would use a PDF library 
    // to merge the files and generate a download link
    
    // Simulating processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsDownloadReady(true);
    }, 2000);
  };

  const handleDownload = () => {
    // In a real implementation, you would provide the merged PDF file for download
    console.log("Downloading merged PDF");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Merge PDF</h1>
            <p className="text-gray-600 mt-2">Combine multiple PDF files into one document</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Merge size={32} className="text-pdf-blue" />
              </div>
            </div>
            
            <FileUpload
              onFilesSelected={handleFilesSelected}
              maxFiles={10}
              acceptedFileTypes=".pdf"
              className="mb-8"
            />
            
            <div className="flex flex-col items-center">
              {files.length > 0 && (
                <Button 
                  onClick={handleMergePDFs} 
                  disabled={isProcessing || files.length < 2}
                  className="w-full sm:w-auto bg-pdf-blue hover:bg-blue-700 mb-4"
                >
                  {isProcessing ? "Processing..." : "Merge PDFs"}
                </Button>
              )}
              
              {isDownloadReady && (
                <Button 
                  onClick={handleDownload} 
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Merged PDF
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">How to Merge PDF Files</h2>
            
            <ol className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">1</span>
                <div>
                  <p>Upload two or more PDF files that you want to combine into a single PDF document.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">2</span>
                <div>
                  <p>Arrange the files in the desired order by dragging them up or down in the list.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">3</span>
                <div>
                  <p>Click the "Merge PDFs" button to combine all files into a single PDF document.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">4</span>
                <div>
                  <p>Download your merged PDF file once processing is complete.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MergePDF;
