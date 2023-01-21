import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

export default function newMemo({ list, setCoor }) {
  const nodeRef = useRef(null);
  const { content, color, font, fontColor, nickname } = list;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [Opacity, setOpacity] = useState(false);

  const trackPos = data => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
    setCoor(position);
  };

  return (
    <Draggable
      bounds="parent"
      nodeRef={nodeRef}
      onDrag={(e, data) => trackPos(data)}
      onStart={handleStart}
      onStop={handleEnd}
      defaultPosition={{ x: position.x, y: position.y }}
    >
      <MemoBox
        background={color}
        font={font}
        color={fontColor}
        ref={nodeRef}
        className="box"
        style={{
          opacity: Opacity ? '0.6' : '1',
          position: 'absolute',
        }}
      >
        <div>{content}</div>
        <Name>작성자:{nickname} </Name>
      </MemoBox>
    </Draggable>
  );
}

const MemoBox = styled.div`
  width: 184px;
  height: 174px;
  background: ${props => props.background};
  border-radius: 15px;
  font-family: ${props => props.font};
  color: ${props => props.color};
  display: flex;
  align-items: flex-start;
`;

const Name = styled.div`
  background-color: red;
  order: 1;
  width: 7rem;
  align-self: flex-end;
`;
