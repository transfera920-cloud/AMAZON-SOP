import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  FileText,
  Radio,
  CloudRain,
  Backpack,
  ShieldCheck,
  Users,
  Sparkles,
} from 'lucide-react';
import { BRAND_INFO } from '../data/sopData';

interface LeaderToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderToolsModal: React.FC<LeaderToolsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'recruitment' | 'buddy' | 'decision' | 'inreach' | 'gear'>('recruitment');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const recruitmentTemplate = `【${BRAND_INFO.organization}｜高山團隊出團招募公告】
■ 活動主題：[例如：雪山主東峰三日高山訓練]
■ 活動日期：202X 年 XX 月 XX 日(五) ～ XX 月 XX 日(日)
■ 帶隊領隊：[領隊姓名 / 證照級別]
■ 協作嚮導：[隨隊嚮導 / 壓後人員]
■ 活動群組：[專屬 LINE 活動群組連結]

■ 每日預定行程與預估步程：
- D1：07:00 登山口集合出發 → 七卡山莊 → 哭坡 → 369營地（步行約 5.5 小時）
- D2：05:00 輕裝出發 → 黑森林 → 雪山主峰 → 369營地（步行約 6.5 小時）
- D3：06:30 拔營下山 → 登山口 → 慶功宴 → 返程（步行約 4.5 小時）

■ 費用明細（透明全包制）：
每人費用：NT$ [費用金額]
費用包含：
1. 往返接駁車資與司機津貼
2. 國家公園入園規費與行政費用
3. 專業領隊帶隊與安全管理費
4. 登山綜合保險（含緊急救援費用）
5. 協作早晚餐與公共帳篷分擔

■ 退費與不可抗力規範：
1. 如遇天災、颱風警報或政府封園，扣除已發生之必要規費/保險/行政支出後全額退費或延期。
2. 隊員因個人因素取消，依本會公告退費標準階梯辦理。

■ 團隊安全承諾：
本團堅持「團進團出、專業嚴謹、科學安全、平安歸來」。報名請私訊官方管道填寫能力調查。`;

  const inreachTemplate = `【${BRAND_INFO.organization}｜衛星通訊每日回報標準格式】
■ 晨間出發回報（例行）：
「[隊伍名稱] 06:30 自 [營地/山屋] 出發前往 [目標點]，全員 XX 人身心狀況正常，今日天候 [晴/陰]，預計 16:30 抵達營地。」

■ 中繼節點回報（定位）：
「[隊伍名稱] 11:30 通過 [重要地標/山頂]，全員平安，在此休息用餐，預計 12:15 續行。」

■ 傍晚抵營回報（紮營）：
「[隊伍名稱] 16:15 全員 XX 人已平安抵達 [營地名稱]，水源充足，通訊正常，明晨預定 05:30 出發。」

■ 緊急事件回報（格式）：
「【緊急通報】[隊伍名稱] 於 [座標/地標] 發生 [狀況描述]，傷者 [姓名] 目前 [意識/傷勢]，已由領隊處置，請留守人協助 [需求，如通報搜救/直升機]。」`;

  const buddyRules = [
    '1. 隨時觀察同組組員身心狀況與臉色氣色',
    '2. 各組組長於每次休息、叉路與出發時掌握並清點人數',
    '3. 任何人嚴禁超前領隊組',
    '4. 任何人嚴禁落後於壓後組之後',
    '5. 維持前後組合理視線與無線電／呼叫聯絡距離',
    '6. 一旦發現組員異常（失溫徵兆、高山症、步伐不穩），立即大聲通報領隊與壓後',
    '7. 嚴禁任何原因單獨拆隊或獨自前行／折返',
    '8. 必要時（如如廁、調整背包、取水）以「互助組」為最小連帶行動單位',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#161a16] border border-[#2d3a2d] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#1a1f1a] border-b border-[#2d3a2d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#2d5a27]/30 border border-[#7cae7a]/30 text-[#7cae7a]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                領隊實務工具箱與標準公版
              </h3>
              <p className="text-xs text-gray-400">
                <a href={BRAND_INFO.brandUrl} className="text-[#7cae7a] hover:underline">{BRAND_INFO.organization}</a> 標準表單、通訊公版與決策參考指引
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#0d0f0d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Navigation */}
        <div className="flex items-center gap-1.5 p-2 bg-[#0d0f0d] border-b border-[#2d3a2d] overflow-x-auto">
          <button
            onClick={() => setActiveTab('recruitment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'recruitment'
                ? 'bg-[#2d5a27] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>開團招募文公版</span>
          </button>

          <button
            onClick={() => setActiveTab('buddy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'buddy'
                ? 'bg-[#2d5a27] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>互助組 8 大原則</span>
          </button>

          <button
            onClick={() => setActiveTab('inreach')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'inreach'
                ? 'bg-[#2d5a27] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>衛星留守回報格式</span>
          </button>

          <button
            onClick={() => setActiveTab('decision')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'decision'
                ? 'bg-[#2d5a27] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Go/No-Go 氣象決策</span>
          </button>

          <button
            onClick={() => setActiveTab('gear')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'gear'
                ? 'bg-[#2d5a27] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Backpack className="w-3.5 h-3.5" />
            <span>13項核心裝備清冊</span>
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-[#141814]">
          {activeTab === 'recruitment' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-300">
                  標準開團招募文範本（可點擊複製後修改自用）
                </span>
                <button
                  onClick={() => handleCopy(recruitmentTemplate, 'recruit')}
                  className="px-3 py-1.5 rounded-lg bg-[#2d5a27] hover:bg-[#3d7a35] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
                >
                  {copiedId === 'recruit' ? <Check className="w-4 h-4 text-[#7cae7a]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'recruit' ? '已複製到剪貼簿' : '一鍵複製公版'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#0d0f0d] border border-[#2d3a2d] text-xs sm:text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {recruitmentTemplate}
              </pre>
            </div>
          )}

          {activeTab === 'buddy' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#0d0f0d] border border-[#2d3a2d]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-[#7cae7a]">
                    登山口出發宣達：互助組（Buddy System）8 大安全原則
                  </h4>
                  <button
                    onClick={() => handleCopy(buddyRules.join('\n'), 'buddy')}
                    className="px-2.5 py-1 rounded bg-[#1a1f1a] text-xs text-gray-300 hover:bg-[#232a23] border border-[#2d3a2d] flex items-center gap-1"
                  >
                    {copiedId === 'buddy' ? '已複製' : '複製條文'}
                  </button>
                </div>
                <div className="space-y-2.5">
                  {buddyRules.map((rule, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-[#161a16] border border-[#2d3a2d] text-xs sm:text-sm text-gray-300">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inreach' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-300">
                  Garmin inReach 衛星簡訊例行與緊急回報標準公版
                </span>
                <button
                  onClick={() => handleCopy(inreachTemplate, 'inreach')}
                  className="px-3 py-1.5 rounded-lg bg-[#2d5a27] hover:bg-[#3d7a35] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
                >
                  {copiedId === 'inreach' ? <Check className="w-4 h-4 text-[#7cae7a]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'inreach' ? '已複製' : '複製格式'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#0d0f0d] border border-[#2d3a2d] text-xs sm:text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {inreachTemplate}
              </pre>
            </div>
          )}

          {activeTab === 'decision' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#2d5a27]/20 border border-[#7cae7a]/40">
                  <div className="text-sm font-bold text-[#7cae7a] mb-1">【GO 正常出發】</div>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    <li>無颱風、豪雨或強風特報</li>
                    <li>Windy 稜線陣風低於 6~7 級</li>
                    <li>降雨機率低於 30%，無致災對流</li>
                    <li>隊員體能狀態全數過關</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#f27d26]/10 border border-[#f27d26]/40">
                  <div className="text-sm font-bold text-amber-300 mb-1">【MODIFY 調整備案】</div>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    <li>局部短暫陣雨，但無坍方危險</li>
                    <li>啟動備案：縮短天數或改住山屋</li>
                    <li>取消危險稜線攀登，改走安全主線</li>
                    <li>提早出發避開午後熱對流</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40">
                  <div className="text-sm font-bold text-rose-300 mb-1">【NO-GO 堅決取消】</div>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    <li>發布海上/陸上颱風警報</li>
                    <li>豪雨或大豪雨特報、封園管制</li>
                    <li>稜線陣風大於 9~10 級（吹落失溫）</li>
                    <li>山徑路基流失坍方或溪水暴漲</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0d0f0d] border border-[#2d3a2d] text-xs text-gray-400">
                ⚠️ 提醒原則：領隊決策嚴禁受到「沈沒成本」（已請假、已租車、隊員期待）影響，生命安全高於一切行程期待。
              </div>
            </div>
          )}

          {activeTab === 'gear' && (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-gray-300">
                出發前 13 項核心救命裝備與重量查驗清冊：
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                {[
                  '1. 個人核心裝備（睡袋、睡墊、登山杖、頭燈＋備用電池）',
                  '2. 公共裝備（帳篷、地布、炊事裝備）',
                  '3. 個人背負重量確認（體重 25~30% 以內）',
                  '4. 公裝公平分攤過磅',
                  '5. 食物規劃（正餐＋備用糧 1~2 日）',
                  '6. 飲水補給（每日 2~3L ＋ 保溫瓶熱水）',
                  '7. 高熱量行動糧（堅果、能量膠、鹽糖）',
                  '8. 保暖系統（羽絨衣、保暖帽、手套、羊毛襪）',
                  '9. 防雨系統（兩截式防水透氣雨衣褲、背包套）',
                  '10. 導航系統（離線地圖 GPX、指北針、紙圖、行動電源）',
                  '11. 通訊系統（無線電對頻、Garmin inReach、手機）',
                  '12. 急救醫藥包（彈性繃帶、紗布、優碘、個人用藥）',
                  '13. 緊急撤退裝備（救生毯、高山外帳、哨子、打火機）',
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-[#0d0f0d] border border-[#2d3a2d]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
