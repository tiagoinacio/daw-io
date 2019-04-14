import React from 'react';
import PropTypes from 'prop-types';

export default class Waveform extends React.PureComponent {
  static defaultProps = {
    buffer: null,
    height: 100,
    color: 'black'
  };

  constructor() {
    super();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    var middle = this.props.height / 2;
    var channelData = this.props.buffer.getChannelData(0);
    var step = Math.ceil(channelData.length / this.props.width);
    this.ctx = this.canvasRef.current.getContext('2d');
    this.ctx.fillStyle = this.props.color;
    this.draw(
      this.props.width,
      step,
      middle,
      channelData,
      this.ctx,
      this.props.padding
    );
    this.props.onDone();
  }

  componentWillUpdate() {
    var middle = this.props.height / 2;
    var channelData = this.props.buffer.getChannelData(0);
    var step = Math.ceil(channelData.length / this.props.width);
    this.ctx = this.canvasRef.current.getContext('2d');
    this.ctx.fillStyle = this.props.color;
    this.draw(
      this.props.width,
      step,
      middle,
      channelData,
      this.ctx,
      this.props.padding
    );
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
        style={this.props.style}
        ref={this.canvasRef}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

Waveform.propTypes = {
  buffer: PropTypes.object.isRequired,
  height: PropTypes.number,
  style: PropTypes.object,
  width: PropTypes.number,
  color: PropTypes.string,
  onDone: PropTypes.func,
  padding: PropTypes.number
};
