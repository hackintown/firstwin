import Navigation from "../components/User/Dashboard/Navigation";
import TabBar from "../components/User/Dashboard/TabBar";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-background relative max-w-md">
      <Navigation />
      <main className="pt-16 pb-20">
        <div className="px-4">{children}</div>
      </main>
      <TabBar />
    </div>
  );
}
