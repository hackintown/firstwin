import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1>Admin Layout</h1>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
