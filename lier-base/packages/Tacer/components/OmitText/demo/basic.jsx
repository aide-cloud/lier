import React from 'react';
import { OmitText } from 'tacer-cloud';

export default () => {
  const boxStyle = {
    border: '1px solid #555',
    margin: '10px 0',
  };
  return (
    <div
      style={{
        width: '400px',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
      }}
    >
      <h3>
        <code>default</code>
      </h3>
      <OmitText style={boxStyle}>
        这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话
      </OmitText>
      <h3>
        <code>showTooltip</code>
      </h3>
      <OmitText showTooltip style={boxStyle}>
        这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话
      </OmitText>
      <h3>
        <code>maxLine=2</code>
      </h3>
      <OmitText showTooltip maxLine={2} style={boxStyle}>
        这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话
      </OmitText>

      <h3>
        <code>maxLine=3</code>
      </h3>
      <OmitText showTooltip maxLine={3} style={boxStyle}>
        这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话
        这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话这是很长的一句话
      </OmitText>

      <h3>
        <code>placeholder</code>
      </h3>
      <OmitText placeholder="--" style={boxStyle} />
    </div>
  );
};
