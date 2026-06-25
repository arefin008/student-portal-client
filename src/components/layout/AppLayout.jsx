import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {" "}
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}{" "}
        <div className="hidden lg:block">
          {" "}
          <Sidebar />{" "}
        </div>
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed top-0 left-0 z-50 h-screen lg:hidden">
              <Sidebar />
            </div>
          </>
        )}
        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-slate-100 transition"
            >
              <Menu size={22} />
            </button>

            <h1 className="font-semibold text-slate-900">Student Portal</h1>

            <div className="w-10" />
          </div>

          {/* Existing TopBar */}
          <div className="hidden lg:block">
            <TopBar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
