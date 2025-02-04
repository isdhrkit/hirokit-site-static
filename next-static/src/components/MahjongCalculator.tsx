import { useState } from 'react';

interface ScoreResult {
  han: number;
  fu: number;
  points: number;
  description: string;
}

interface YakuOption {
  name: string;
  han: number;
  closed?: boolean; // 門前限定の役の場合true
}

const yakuList: YakuOption[] = [
  // 1翻役
  { name: "立直", han: 1, closed: true },
  { name: "門前清自摸和", han: 1, closed: true },
  { name: "平和", han: 1, closed: true },
  { name: "一発", han: 1 },
  { name: "断么九", han: 1 },
  { name: "一盃口", han: 1, closed: true },
  { name: "役牌 白", han: 1 },
  { name: "役牌 發", han: 1 },
  { name: "役牌 中", han: 1 },
  { name: "自風 東", han: 1 },
  { name: "自風 南", han: 1 },
  { name: "自風 西", han: 1 },
  { name: "自風 北", han: 1 },
  { name: "場風 東", han: 1 },
  { name: "場風 南", han: 1 },
  { name: "場風 西", han: 1 },
  { name: "場風 北", han: 1 },
  { name: "槍槓", han: 1 },
  { name: "嶺上開花", han: 1 },
  { name: "海底撈月", han: 1 },
  { name: "河底撈魚", han: 1 },

  // 2翻役
  { name: "ダブル立直", han: 2, closed: true },
  { name: "七対子", han: 2, closed: true },
  { name: "対々和", han: 2 },
  { name: "三暗刻", han: 2 },
  { name: "三色同順", han: 2 },
  { name: "一気通貫", han: 2 },
  { name: "混全帯么九", han: 2 },
  { name: "小三元", han: 2 },
  { name: "三槓子", han: 2 },
  { name: "混老頭", han: 2 },

  // 3翻役
  { name: "二盃口", han: 3, closed: true },
  { name: "純全帯么九", han: 3 },
  { name: "混一色", han: 3 },

  // 6翻役
  { name: "清一色", han: 6 },

  // 役満
  { name: "天和", han: 13, closed: true },
  { name: "地和", han: 13, closed: true },
  { name: "大三元", han: 13 },
  { name: "四暗刻", han: 13, closed: true },
  { name: "国士無双", han: 13, closed: true },
  { name: "小四喜", han: 13 },
  { name: "大四喜", han: 13 },
  { name: "字一色", han: 13 },
  { name: "緑一色", han: 13 },
  { name: "清老頭", han: 13 },
  { name: "四槓子", han: 13 },
  { name: "九蓮宝燈", han: 13, closed: true }
];

const calculatePoints = (han: number, fu: number, isDealer: boolean): ScoreResult => {
  let points = 0;
  let description = '';

  // 役満の場合
  if (han >= 13) {
    points = isDealer ? 48000 : 32000;
    description = '役満';
    return { han, fu, points, description };
  }

  // 点数計算
  if (han >= 5) {
    // 満貫以上
    if (han >= 11) {
      points = isDealer ? 48000 : 32000;
      description = '三倍満';
    } else if (han >= 8) {
      points = isDealer ? 36000 : 24000;
      description = '倍満';
    } else if (han >= 6) {
      points = isDealer ? 24000 : 16000;
      description = '跳満';
    } else {
      points = isDealer ? 12000 : 8000;
      description = '満貫';
    }
  } else {
    // 通常の計算
    let base = fu * Math.pow(2, han + 2);
    
    // 満貫の上限チェック
    if (base > 2000) {
      base = 2000;
      description = '満貫';
    }

    points = isDealer ? base * 6 : base * 4;
    description = `${han}飜${fu}符`;
  }

  // 100点単位に切り上げ
  points = Math.ceil(points / 100) * 100;

  return { han, fu, points, description };
};

const MahjongCalculator = () => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [fu, setFu] = useState<number>(30);
  const [isDealer, setIsDealer] = useState<boolean>(false);
  const [selectedYaku, setSelectedYaku] = useState<Set<string>>(new Set());
  const [doraCount, setDoraCount] = useState<number>(0);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleYakuToggle = (yakuName: string) => {
    const newSelected = new Set(selectedYaku);
    if (newSelected.has(yakuName)) {
      newSelected.delete(yakuName);
    } else {
      newSelected.add(yakuName);
    }
    setSelectedYaku(newSelected);
  };

  const calculateTotalHan = (): number => {
    return yakuList
      .filter(yaku => selectedYaku.has(yaku.name))
      .reduce((total, yaku) => total + yaku.han, 0);
  };

  const handleCalculate = () => {
    const yakuHan = calculateTotalHan();
    const totalHan = yakuHan + doraCount;
    
    if (totalHan === 0) {
      alert('役を選択してください');
      return;
    }
    const score = calculatePoints(totalHan, fu, isDealer);
    setResult(score);
  };

  const handleCloseResult = () => {
    setResult(null);
    setSelectedYaku(new Set());
  };

  return (
    <div className="mahjong-calculator">
      <h1 className="text-2xl mb-8 text-center text-[#0F0] sticky top-0 bg-black/95 py-4 z-10">
        麻雀点数計算
      </h1>
      
      <div className="calculator-form">
        <div className="basic-settings sticky top-[65px] bg-black/95 z-10 border-b border-[#0F0]">
          <div className="checkbox-container">
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={isClosed}
                onChange={(e) => setIsClosed(e.target.checked)}
                className="calculator-checkbox"
              />
              門前
            </label>
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={isDealer}
                onChange={(e) => setIsDealer(e.target.checked)}
                className="calculator-checkbox"
              />
              親の場合はチェック
            </label>
          </div>

          <div className="form-group">
            <label className="fu-label">符数</label>
            <select 
              value={fu}
              onChange={(e) => setFu(Number(e.target.value))}
              className="calculator-select"
            >
              {[20, 25, 30, 40, 50, 60, 70, 80, 90, 100].map(value => (
                <option key={value} value={value}>{value}符</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="dora-label">ドラ数</label>
            <select
              value={doraCount}
              onChange={(e) => setDoraCount(Number(e.target.value))}
              className="calculator-select"
            >
              {[...Array(13)].map((_, i) => (
                <option key={i} value={i}>{i}個</option>
              ))}
            </select>
          </div>
        </div>

        <div className="yaku-selection">
          <h2 className="text-xl mb-4">役の選択</h2>
          <div className="yaku-grid">
            {yakuList.map((yaku) => (
              <label 
                key={yaku.name}
                className={`yaku-option ${
                  (!isClosed && yaku.closed) ? 'disabled' : ''
                } ${selectedYaku.has(yaku.name) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedYaku.has(yaku.name)}
                  onChange={() => handleYakuToggle(yaku.name)}
                  disabled={!isClosed && yaku.closed}
                  className="hidden"
                />
                <span className="yaku-name">{yaku.name}</span>
                <span className="yaku-han">{yaku.han}飜</span>
              </label>
            ))}
          </div>
        </div>

        <div className="calculator-footer sticky bottom-0 bg-black/95 pt-4 pb-2 z-10">
          <button 
            onClick={handleCalculate}
            className="calculator-button"
          >
            計算する
          </button>

          {result && (
            <div className="result-display">
              <button 
                onClick={handleCloseResult}
                className="close-button"
                aria-label="結果を閉じる"
              >
                ×
              </button>
              <p className="text-xl">{result.description}</p>
              <p className="text-3xl font-bold">{result.points.toLocaleString()}点</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MahjongCalculator; 