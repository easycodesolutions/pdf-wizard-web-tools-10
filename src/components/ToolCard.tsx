
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
}

const ToolCard = ({ title, description, icon, to }: ToolCardProps) => {
  return (
    <Link to={to}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-pdf-lightgray rounded-full">
              {icon}
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ToolCard;
