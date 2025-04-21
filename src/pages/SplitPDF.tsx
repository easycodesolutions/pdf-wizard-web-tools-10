
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Scissors, Download } from "lucide-react";

const SplitPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [splitMethod, setSplitMethod] = useState<'all' | 'range'>('all');
  const [pageRange, setPageRange] = useState('');

  const handleFilesSelected = (selectedFiles: File[]) => {
    // For split operation, we only need one file
    setFiles(selectedFiles.slice(0, 1));
    setIsDownloadReady(false);
  };

  const handleSplitPDF = () => {
    if (files.length === 0) {
      alert("Please select a PDF file to split");
      return;
    }

    setIsProcessing(true);
    
    // In a real implementation, you would use a PDF library 
    // to split the file and generate download links
    
    // Simulating processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsDownloadReady(true);
    }, 2000);
  };

  const handleDownload = () => {
    // In a real implementation, you would provide the split PDF files for download
    console.log("Downloading split PDF files");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Split PDF</h1>
            <p className="text-gray-600 mt-2">Extract pages or split a PDF into multiple files</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Scissors size={32} className="text-pdf-blue" />
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
                <h3 className="text-lg font-medium mb-3">Split Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="split-all"
                      name="split-method"
                      checked={splitMethod === 'all'}
                      onChange={() => setSplitMethod('all')}
                      className="h-4 w-4 text-pdf-blue focus:ring-pdf-blue"
                    />
                    <label htmlFor="split-all" className="text-gray-700">
                      Split by all pages (one PDF per page)
                    </label>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="split-range"
                        name="split-method"
                        checked={splitMethod === 'range'}
                        onChange={() => setSplitMethod('range')}
                        className="h-4 w-4 text-pdf-blue focus:ring-pdf-blue"
                      />
                      <label htmlFor="split-range" className="text-gray-700">
                        Split by page range
                      </label>
                    </div>
                    
                    {splitMethod === 'range' && (
                      <div className="mt-2 pl-6">
                        <input
                          type="text"
                          value={pageRange}
                          onChange={(e) => setPageRange(e.target.value)}
                          placeholder="e.g., 1-3,5-8,10"
                          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-pdf-blue focus:border-pdf-blue"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Specify ranges like "1-5,8,11-13" or separate pages with commas
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col items-center">
              {files.length > 0 && (
                <Button 
                  onClick={handleSplitPDF} 
                  disabled={isProcessing || (splitMethod === 'range' && !pageRange)}
                  className="w-full sm:w-auto bg-pdf-blue hover:bg-blue-700 mb-4"
                >
                  {isProcessing ? "Processing..." : "Split PDF"}
                </Button>
              )}
              
              {isDownloadReady && (
                <Button 
                  onClick={handleDownload} 
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Split Files
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">How to Split a PDF File</h2>
            
            <ol className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">1</span>
                <div>
                  <p>Upload the PDF document that you want to split into multiple files.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">2</span>
                <div>
                  <p>Choose your preferred splitting method: extract all pages as individual PDFs or specify page ranges.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">3</span>
                <div>
                  <p>If selecting the page range option, enter the specific ranges you want to extract (e.g., 1-3,5-8).</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-pdf-blue font-medium">4</span>
                <div>
                  <p>Click the "Split PDF" button to process your file and then download the split PDFs.</p>
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

export default SplitPDF;
