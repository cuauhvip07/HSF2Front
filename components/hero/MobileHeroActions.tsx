import Link from 'next/link';

export default function MobileHeroActions() {
  return (
    <div className="block md:hidden w-full px-4">
      <Link 
        href="/habitaciones"
        className="block w-full text-center bg-[#d95d39] hover:bg-[#c24e2b] text-white font-semibold py-4 rounded-full transition-colors uppercase tracking-wider text-sm shadow-lg"
      >
        Ver Habitaciones
      </Link>
    </div>
  );
}