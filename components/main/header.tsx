import MobileNav from "./mobilenav";
import DesktopNav from "./desktopnav"; // Asegúrate de ajustar la ruta si es distinta

export default function Header() {
  return (
    <header className="w-full">
      <div className="block md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:block">
        <DesktopNav />
      </div>
    </header>
  );
}