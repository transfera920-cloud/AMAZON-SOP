import React from 'react';
import { Compass, Shield, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/sopData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[#2d3a2d] bg-[#0d0f0d] py-10 px-4 sm:px-6 text-gray-400 print:hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2d5a27]/30 border border-[#7cae7a]/30 flex items-center justify-center text-[#7cae7a]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <a
                href={BRAND_INFO.brandUrl}
                className="text-sm font-bold text-white hover:text-[#7cae7a] transition-colors inline-block"
                title="前往亞馬遜國家山岳協會"
              >
                {BRAND_INFO.organization}
              </a>
              <div className="text-xs text-gray-500">
                {BRAND_INFO.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#7cae7a] font-semibold">專業嚴謹</span>
            <span className="text-gray-600">•</span>
            <span className="text-emerald-400 font-semibold">團隊互助</span>
            <span className="text-gray-600">•</span>
            <span className="text-[#f27d26] font-semibold">科學安全</span>
            <span className="text-gray-600">•</span>
            <span className="text-amber-300 font-semibold">平安歸來</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1a201a] text-xs text-gray-500 leading-relaxed space-y-1.5">
          <p>
            ※ 本教案供領隊教育培訓、出團前檢核與團隊安全準備使用。高山環境多變，各項氣象與醫療建議均屬安全提醒，領隊應依據實地現況與專業判斷採取最高安全準則處置。
          </p>
          <p>
            © {new Date().getFullYear()} {BRAND_INFO.organization} {BRAND_INFO.enName}. 版權所有。
          </p>
        </div>
      </div>
    </footer>
  );
};
