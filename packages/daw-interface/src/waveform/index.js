import React from 'react';
import PropTypes from 'prop-types';

export default class Waveform extends React.Component {
  static defaultProps = {
    buffer: null,
    height: 100,
    zoom: 1,
    color: 'black'
  };

  constructor() {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    var width = (this.props.buffer.length / 10000) * this.props.zoom;
    var middle = this.props.height / 2;
    var channelData = this.props.buffer.getChannelData(0);
    var step = Math.ceil(channelData.length / width);

    var ctx = this.canvasRef.current.getContext('2d');
    ctx.fillStyle = this.props.color;
    this.draw(width, step, middle, channelData, ctx);

    this.props.onDone();
  }

  draw(width, step, middle, data, ctx) {
    for (var i = 0; i < width; i += 1) {
      var min = 1.0;
      var max = -1.0;

      for (var j = 0; j < step; j += 1) {
        var datum = data[i * step + j];

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
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={(this.props.buffer.length / 10000) * this.props.zoom}
        height={this.props.height}
      />
    );
  }
}

Waveform.propTypes = {
  buffer: PropTypes.object.isRequired,
  height: PropTypes.number,
  zoom: PropTypes.number,
  color: PropTypes.string,
  onDone: PropTypes.func
};
