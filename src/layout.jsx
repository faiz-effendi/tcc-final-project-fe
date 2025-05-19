import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/pixel-city-chill.gif"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover blur-[3px] scale-101 -z-10"
      />

      {/* Content disini */}
      <Outlet />
    </div>
  );
}

export default Layout;