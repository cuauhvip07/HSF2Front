interface MetricProps {
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  textColor?: string;
  icon?: string;
}

export default function MetricCard({ title, value, subtitle, bgColor, textColor = 'text-white', icon }: MetricProps) {
  return (
    <div className={`p-5 rounded-xl shadow-sm ${bgColor} ${textColor} flex flex-col justify-between h-32`}>
      <div className="flex justify-between items-start">
        <span className="text-xs uppercase font-medium opacity-80">{title}</span>
        {icon && (
          <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        )}
      </div>

      <div>
        <div className="text-3xl font-bold font-serif">{value}</div>
        <div className="text-[11px] opacity-75 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}