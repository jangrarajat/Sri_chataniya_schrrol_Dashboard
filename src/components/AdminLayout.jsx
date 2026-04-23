import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="lg:ml-64">
        {title && (
          <div className="border-b border-border bg-red-600 sticky top-0 z-10">
            <div className="px-6 py-4">
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            </div>
          </div>
        )}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;