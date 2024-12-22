import { Outlet } from "react-router-dom";
import Navigation from "../components/User/Dashboard/Navigation";
import BottomNav from "../components/ui/Navbar/BottomNav";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative">
      <Navigation />
      <main className="flex-1 bg-background px-4 pt-20 pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
