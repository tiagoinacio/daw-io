import React, { useRef, useEffect, memo, useState } from 'react';

export default memo(props => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const middle = props.height / 2;

  const draw = ctx => {
    const step = Math.ceil(props.channelData.length / props.width);

    ctx.fillStyle = props.color;

    for (var i = 0; i < props.width; i += 1) {
      var min = 1.0;
      var max = -1.0;
      for (var j = 0; j < step; j += 1) {
        var datum = props.channelData[i * step + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        ctx.fillRect(
          i,
          (1 + min) * middle,
          1,
          Math.max(1, (max - min) * middle)
        );
      }
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    draw(ctx);

    ctx.save();
    setCtx(ctx);
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, props.width, props.height);

      ctx.restore();
      draw(ctx);
    }
  }, [props.channelData]);

  return (
    <canvas
      style={props.style}
      ref={canvasRef}
      width={props.width}
      height={props.height}
    />
  );
});
