import { AlertCircle } from "lucide-react";

const PagePlaceholder = ({ title, description }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-sidebar-foreground/60 mb-6">{description}</p>
        <p className="text-sm text-sidebar-foreground/50">
          Continue prompting to fill in this page with its full functionality and content.
        </p>
      </div>
    </div>
  );
};

export default PagePlaceholder;