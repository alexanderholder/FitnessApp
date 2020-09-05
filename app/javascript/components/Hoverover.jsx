// @flow
import React, { useState } from 'react';

export default function Hoverover() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="App">
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        Hover over me!
      </div>
      {isShown && (
        <div>
          I'll appear when you hover over the button.
        </div>
      )}
    </div>
  );
}