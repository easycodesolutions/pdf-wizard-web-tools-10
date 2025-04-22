
import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { PDFDocument } from "pdf-lib";
import { Progress } from "@/components/ui/progress";
import { Save, Type, Image, Shapes, Edit } from "lucide-react";

const EditPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setProgress(0);
    
    if (selectedFiles.length > 0) {
      const url = URL.createObjectURL(selectedFiles[0]);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSave = async () => {
    if (files.length === 0 || !previewUrl) {
      toast.error("Please upload a PDF file first");
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      // Mock progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 100);

      // Actually just return the original PDF for now
      // In a real implementation, we would apply edits here
      const arrayBuffer = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pdfBytes = await pdfDoc.save();
      
      clearInterval(progressInterval);
      setProgress(100);

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `edited_${files[0].name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("PDF saved with edits");
    } catch (error) {
      console.error("Error saving PDF:", error);
      toast.error("Failed to save PDF. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit PDF</h1>
            <p className="text-gray-600">Add text, images and shapes to your PDF</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Upload PDF</h2>
              <FileUpload 
                onFilesSelected={handleFilesSelected}
                maxFiles={1}
                acceptedFileTypes=".pdf"
              />
            </div>
            
            {previewUrl && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Edit Document</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Type className="h-4 w-4" /> Text
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Image className="h-4 w-4" /> Image
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Shapes className="h-4 w-4" /> Shape
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="h-4 w-4" /> Annotate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded h-96">
                    <iframe 
                      src={previewUrl} 
                      title="PDF Preview" 
                      className="w-full h-full"
                    />
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={handleSave} 
                      disabled={processing}
                      className="flex items-center gap-1"
                    >
                      <Save className="h-4 w-4" />
                      {processing ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                  
                  {processing && (
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-medium text-gray-700">
                        Saving PDF... {progress}%
                      </p>
                      <Progress value={progress} />
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Tips for Editing</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Click on the Text button to add text to your document.</li>
                    <li>Use the Image button to insert images into your PDF.</li>
                    <li>Add shapes to highlight important information.</li>
                    <li>Use the annotation tools for highlighting or commenting.</li>
                    <li>Remember to save your changes before leaving this page.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditPDF;
