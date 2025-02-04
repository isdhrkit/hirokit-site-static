import { useState, useCallback, useEffect } from 'react';

interface DiceResult {
  values: number[];
  type: string;
  score: number;
}

const DiceDots = ({ value }: { value: number }) => {
  const dots = Array(value).fill(0);
  return (
    <div className="dice-dots">
      {value === 1 && (
        <div className="dot center" />
      )}
      {value === 2 && (
        <>
          <div className="dot top-right" />
          <div className="dot bottom-left" />
        </>
      )}
      {value === 3 && (
        <>
          <div className="dot top-right" />
          <div className="dot center" />
          <div className="dot bottom-left" />
        </>
      )}
      {value === 4 && (
        <>
          <div className="dot top-left" />
          <div className="dot top-right" />
          <div className="dot bottom-left" />
          <div className="dot bottom-right" />
        </>
      )}
      {value === 5 && (
        <>
          <div className="dot top-left" />
          <div className="dot top-right" />
          <div className="dot center" />
          <div className="dot bottom-left" />
          <div className="dot bottom-right" />
        </>
      )}
      {value === 6 && (
        <>
          <div className="dot top-left" />
          <div className="dot top-right" />
          <div className="dot middle-left" />
          <div className="dot middle-right" />
          <div className="dot bottom-left" />
          <div className="dot bottom-right" />
        </>
      )}
    </div>
  );
};

// evaluateDice関数をコンポーネントの外に移動
const evaluateDice = (values: number[]): DiceResult => {
  const sorted = [...values].sort((a, b) => a - b);
  
  // ピンゾロ (1-1-1)
  if (sorted[0] === 1 && sorted[1] === 1 && sorted[2] === 1) {
    return { values: sorted, type: "ピンゾロ", score: 5 };
  }
  
  // ゾロ目
  if (sorted[0] === sorted[1] && sorted[1] === sorted[2]) {
    return { values: sorted, type: `${sorted[0]}のゾロ目`, score: 4 };
  }
  
  // 456
  if (sorted[0] === 4 && sorted[1] === 5 && sorted[2] === 6) {
    return { values: sorted, type: "シゴロ", score: 3 };
  }
  
  // 通常の目（2つ同じ目が出た場合）
  const pairs = [];
  if (sorted[0] === sorted[1]) pairs.push([sorted[0], sorted[2]]);
  if (sorted[1] === sorted[2]) pairs.push([sorted[1], sorted[0]]);
  
  if (pairs.length > 0) {
    // 最も高い目を選ぶ
    const highestPair = pairs.reduce((highest, current) => {
      return current[1] > highest[1] ? current : highest;
    }, pairs[0]);
    return { values: sorted, type: `${highestPair[1]}の目`, score: highestPair[1] };
  }
  
  // 123
  if (sorted[0] === 1 && sorted[1] === 2 && sorted[2] === 3) {
    return { values: sorted, type: "ヒフミ", score: 0 };
  }
  
  return { values: sorted, type: "目なし", score: 0 };
};

const generateDice = () => [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1
];

const ChinchiroGame = () => {
  const [diceValues, setDiceValues] = useState<number[]>([1, 1, 1]);
  const [result, setResult] = useState<DiceResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    
    setIsRolling(true);
    setResult(null);
    
    let rolls = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      const newValues = generateDice();
      setDiceValues(newValues);
      
      rolls++;
      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        const finalValues = generateDice();
        setDiceValues(finalValues);
        setResult(evaluateDice(finalValues));
        setIsRolling(false);
        setHasRolled(true);
      }
    }, 100);
  }, [isRolling]);

  return (
    <div className="chinchiro-container">
      
      <div className="dice-container">
        {diceValues.map((value, index) => (
          <div key={index} className="dice">
            <DiceDots value={value} />
          </div>
        ))}
      </div>
      
      {hasRolled && result && (
        <div className={`result ${result.score > 0 ? 'win' : 'lose'}`}>
          <p className="result-type">{result.type}</p>
        </div>
      )}
      
      <button 
        onClick={rollDice} 
        disabled={isRolling}
        className={isRolling ? 'rolling' : ''}
      >
        {isRolling ? 'サイコロを振っています...' : 'サイコロを振る'}
      </button>
    </div>
  );
};

export default ChinchiroGame; 