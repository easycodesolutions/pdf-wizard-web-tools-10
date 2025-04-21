
import { FileText, Merge, Scissors, FileDown, FileUp, Printer, FileCheck, Edit, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pdf-blue to-pdf-purple py-20 px-4 sm:px-6 lg:px-8 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">All PDF tools in one place</h1>
            <p className="text-xl opacity-90 mb-8">
              Free and simple online tools to edit, convert, merge, 
              split and compress your PDF files
            </p>
            <div className="p-4 bg-white bg-opacity-10 rounded-lg inline-flex items-center space-x-2">
              <FileText className="text-white" size={24} />
              <span className="font-semibold">100% secure PDF processing</span>
            </div>
          </div>
        </section>
        
        {/* Tools Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800">
              PDF Tools
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ToolCard
                title="Merge PDF"
                description="Combine multiple PDFs into one file"
                icon={<Merge size={32} className="text-pdf-blue" />}
                to="/merge"
              />
              
              <ToolCard
                title="Split PDF"
                description="Extract pages from a PDF document"
                icon={<Scissors size={32} className="text-pdf-blue" />}
                to="/split"
              />
              
              <ToolCard
                title="Compress PDF"
                description="Reduce file size while optimizing quality"
                icon={<FileDown size={32} className="text-pdf-blue" />}
                to="/compress"
              />
              
              <ToolCard
                title="Convert PDF"
                description="Convert PDFs to Word, Excel, PPT and more"
                icon={<FileUp size={32} className="text-pdf-blue" />}
                to="/convert"
              />
              
              <ToolCard
                title="PDF to Image"
                description="Convert PDF pages to JPG or PNG images"
                icon={<FileCheck size={32} className="text-pdf-blue" />}
                to="/pdf-to-image"
              />
              
              <ToolCard
                title="Print PDF"
                description="Print your PDF files with custom settings"
                icon={<Printer size={32} className="text-pdf-blue" />}
                to="/print"
              />
              
              <ToolCard
                title="Edit PDF"
                description="Add text, images and shapes to your PDF"
                icon={<Edit size={32} className="text-pdf-blue" />}
                to="/edit"
              />
              
              <ToolCard
                title="PDF Reader"
                description="View and annotate PDF files online"
                icon={<BookOpen size={32} className="text-pdf-blue" />}
                to="/reader"
              />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800">
              Why Choose PDFWizard?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="text-pdf-blue" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p className="text-gray-600">Simple interface with powerful features for all PDF needs</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileCheck className="text-pdf-blue" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
                <p className="text-gray-600">Your files are automatically deleted after processing</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileDown className="text-pdf-blue" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free to Use</h3>
                <p className="text-gray-600">All essential PDF tools available at no cost</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
