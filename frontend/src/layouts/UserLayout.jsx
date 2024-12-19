import { Outlet } from "react-router-dom";
import Navigation from "../components/User/Dashboard/Navigation";
import BottomNav from "../components/ui/Navbar/BottomNav";

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 bg-background px-4 py-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
