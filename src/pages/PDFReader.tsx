
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";

const PDFReader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    
    if (selectedFiles.length > 0) {
      const url = URL.createObjectURL(selectedFiles[0]);
      setPreviewUrl(url);
      // In a real implementation, we would get the actual page count from the PDF
      setTotalPages(Math.floor(Math.random() * 10) + 1); // Random page count for demo
      setCurrentPage(1);
    } else {
      setPreviewUrl(null);
      setTotalPages(0);
      setCurrentPage(1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 25);
      toast.info(`Zoom: ${zoomLevel + 25}%`);
    }
  };

  const zoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 25);
      toast.info(`Zoom: ${zoomLevel - 25}%`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">PDF Reader</h1>
          <p className="text-gray-600">View and annotate PDF files online</p>
        </div>
        
        {!previewUrl ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Open a PDF</h2>
              <FileUpload 
                onFilesSelected={handleFilesSelected}
                maxFiles={1}
                acceptedFileTypes=".pdf"
              />
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="text-pdf-blue h-5 w-5" />
                  <span className="text-sm font-medium truncate max-w-xs">
                    {files[0]?.name}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="sm" onClick={zoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-xs px-2">{zoomLevel}%</span>
                  <Button variant="outline" size="sm" onClick={zoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={prevPage}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-xs">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={nextPage}
                    disabled={currentPage >= totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg shadow-sm p-4 flex justify-center">
              <div className="bg-white shadow max-w-full" style={{ zoom: `${zoomLevel}%` }}>
                <iframe 
                  src={`${previewUrl}#page=${currentPage}`}
                  title="PDF Reader" 
                  className="w-[800px] h-[1130px] border" // Approximately A4 size
                />
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PDFReader;
