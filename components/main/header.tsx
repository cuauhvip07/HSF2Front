import MobileNav from "./mobilenav";
import DesktopNav from "./desktopnav";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="block md:hidden pointer-events-auto">
        <MobileNav />
      </div>
      <div className="hidden md:block pointer-events-auto">
        <DesktopNav />
      </div>
    </div>
  );
}