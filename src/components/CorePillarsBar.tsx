import React from 'react';
import { Shield, Users, Activity, HeartHandshake } from 'lucide-react';
import { BRAND_INFO } from '../data/sopData';

export const CorePillarsBar: React.FC = () => {
  const icons = [
    <Shield key="1" className="w-4 h-4 text-[#7cae7a]" />,
    <Users key="2" className="w-4 h-4 text-[#7cae7a]" />,
    <Activity key="3" className="w-4 h-4 text-[#f27d26]" />,
    <HeartHandshake key="4" className="w-4 h-4 text-[#7cae7a]" />,
  ];

  return (
    <div className="bg-[#141814]/90 border-y border-[#2d3a2d] py-3.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#7cae7a] tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f27d26]"></span>
              教案定位與指導原則
            </div>
            <div className="text-sm font-medium text-slate-200">{BRAND_INFO.subtitle}</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {BRAND_INFO.corePillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="bg-[#161a16] border border-[#2d3a2d] rounded-lg p-2.5 flex items-start gap-2.5 transition-all hover:border-[#435943]"
              >
                <div className="p-1 rounded bg-[#0d0f0d] border border-[#2d3a2d] shrink-0 mt-0.5">
                  {icons[idx]}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">{pillar.title}</div>
                  <div className="text-[11px] text-gray-400 leading-tight mt-0.5">{pillar.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
