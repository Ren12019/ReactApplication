import React, { useState, useEffect, CSSProperties } from 'react';
import CalculationButton from '../../modules/buttons/calculation-button/CalculationButton';

export type CalculateType = 'Add' | 'Subtract' | 'Hang' | 'Divide' | 'None';

const Calculation = () => {
  const numberList = [...(Array(3) as [number])].map((_, i) => i + 1);
  const [isDecimal, setIsDecimal] = useState<boolean>(false);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [isAfterEqual, setIsAfterEqual] = useState<boolean>(false);
  const [displayNumber, setDisplayNumber] = useState<number>(0);
  const [calculateResult, setCalculateResult] = useState<number>(0);
  const [calculateNumber, setCalculateNumber] = useState<number>(0);
  const [calculateType, setCalculateType] = useState<CalculateType>('None')

  // 結果を表示
  useEffect(() => {
    setDisplayNumber(calculateResult);
  }, [calculateResult]);

  // 入力を表示
  useEffect(() => {
    setDisplayNumber(calculateNumber);
    if(isInit) {
      setCalculateResult(calculateNumber);
    }
  }, [calculateNumber, isInit]);

  useEffect(()=>{
    if(!isInit) {
      setCalculateNumber(0)
    }
  }, [isInit])

  const calculate = (type: CalculateType) => {
    switch (type) {
      case 'Add':
        setCalculateResult(calculateResult + calculateNumber);
        break;
      case 'Subtract':
        setCalculateResult(calculateResult - calculateNumber);
        break;
      case 'Hang':
        setCalculateResult(calculateResult * calculateNumber);
        break;
      case 'Divide':
        setCalculateResult(calculateResult / calculateNumber);
        break;
      default:
        break;
    }
  };

  const onClickCalculationSymbolImpl = (calculationSymbolType: CalculateType) => {
    setIsInit(false);
    setCalculateType(calculationSymbolType);
  }

  const onClickAdd = () => {
    onClickCalculationSymbolImpl('Add');
  };

  const onClickSubtract = () => {
    onClickCalculationSymbolImpl('Subtract');
  };

  const onClickHang = () => {
    onClickCalculationSymbolImpl('Hang');
  };

  const onClickDivide = () => {
    onClickCalculationSymbolImpl('Divide');
  };

  const onClickEqual = () => {
    calculate(calculateType);
    setIsInit(true);
    if(!isAfterEqual) {
      setIsAfterEqual(true);
    }
  };

  const onClickNumber = (inputNumber: number) => {
    if(isAfterEqual) {
      setCalculateNumber(inputNumber);
      setIsAfterEqual(false);
      return;
    }
    setCalculateNumber(calculateNumber * 10 + inputNumber);
  };

  const onClickDecimal = () => {
    setIsDecimal(true);
  }

  const onClickAllClear = () => {
    setCalculateNumber(0);
    setCalculateResult(0);
    setCalculateType('None');
    setIsInit(true);
    setIsAfterEqual(false);
  };

  const onClickReverseResult = () => {
    setCalculateResult(calculateResult * (-1))
  }

  const plusNumber = () => {
    setCalculateNumber(calculateNumber + 1);
  };

  const displayStyle: CSSProperties = {
    height: '30px',
    width: '240px',
    lineHeight: '30px',
    color: '#ffffff',
    backgroundColor: '#555555',
    paddingRight: '10px',
    boxSizing: 'border-box',
    textAlign: 'right'
  }

  const firstRowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: '60px',
    gridTemplateColumns: '60px 60px 60px 60px',
  };

  const flexStyle: CSSProperties = {
    display: 'flex'
  }

  const tenkeyContainerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: '60px 60px 60px',
    gridTemplateColumns: '60px 60px 60px',
  };

  const lastColumnStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: '60px 60px 60px',
    gridTemplateColumns: '60px',
  };

  const lastRowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: '60px',
    gridTemplateColumns: '120px 60px 60px',
  };

  return (
    <div>
      <h2>Calculation</h2>
      <div>
        <span>
          {calculateResult}+{calculateNumber}
        </span>
      </div>
      <div style={displayStyle}>
        {displayNumber}
      </div>
      <div style={firstRowStyle}>
        <CalculationButton value="AC" tabIndex={0} onClick={onClickAllClear} />
        <CalculationButton value="+/-" tabIndex={0} onClick={onClickReverseResult} />
        <CalculationButton value="%" tabIndex={0} onClick={plusNumber} />
        <CalculationButton value="/" tabIndex={0} onClick={onClickDivide} />
      </div>
      <div style={flexStyle}>
        <div style={tenkeyContainerStyle}>
          {numberList.map((rowNumber) => {
            const rowNumberList = [...numberList];
            return (
              <>
                {rowNumberList.map((columnNumber) => {
                  const correctionValue = 3 * (rowNumber - 1);
                  const buttonNumber = columnNumber + correctionValue;

                  const buttonStyle: CSSProperties = {
                    gridRow: `${4 - rowNumber}`,
                    gridColumn: `${columnNumber}`,
                  };

                  return (
                    <div style={buttonStyle}>
                      <CalculationButton
                        value={String(buttonNumber)}
                        tabIndex={0}
                        onClick={() => {
                          onClickNumber(buttonNumber);
                        }}
                      />
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
        <div style={lastColumnStyle}>
          <CalculationButton value="x" tabIndex={0} onClick={onClickHang} />
          <CalculationButton value="-" tabIndex={0} onClick={onClickSubtract} />
          <CalculationButton value="+" tabIndex={0} onClick={onClickAdd} />
        </div>
      </div>
      <div style={lastRowStyle}>
      <CalculationButton
        value="0"
        tabIndex={0}
        isWide
        onClick={() => {
          onClickNumber(0);
        }}
      />
      <CalculationButton value="." tabIndex={0} onClick={onClickDecimal} />
      <CalculationButton value="=" tabIndex={0} onClick={onClickEqual} />
      </div>
    </div>
  );
};

export default Calculation;
