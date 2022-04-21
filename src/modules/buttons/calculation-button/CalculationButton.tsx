import React from 'react';

type PropsType = {
  value: string;
  tabIndex: number;
  isWide?: boolean;
  onClick: () => void;
};

const CalculationButton = (props: PropsType) => {
  const { value, tabIndex, isWide = false, onClick } = props;

  const buttonStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    color: '#ffffff',
    backgroundColor: '#000000',
    textAlign: 'center',
    lineHeight: '60px',
    cursor: 'pointer',
  };

  if (isWide) {
    buttonStyle.width = '120px';
  }

  return (
    <div style={buttonStyle} onClick={onClick} onKeyUp={onClick} role="button" tabIndex={tabIndex}>
      {value}
    </div>
  );
};

CalculationButton.defaultProps = {
  isWide: false,
};

export default CalculationButton;
