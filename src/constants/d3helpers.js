import * as d3 from 'd3';

export function getClassifiedStyle(num, min, max) {
    // D3 Quantize to classfy into 3 range!
    var quantize = d3.scaleQuantize().domain([min, max]).range(['low', 'middle', 'high']);
    var range = quantize(num);
    // 3 types of highlight color
    var color;
    var style;
    switch (range) {
      case 'low': {
        color = '#ffe500';
        break;
      }
      case 'middle': {
        color = '#ff6500';
        break;
      }
      case 'high': {
        color = '#ff001b';
        break;
      }
      default: {
        color = '#ffffff';
      }
    }
    style = {
      color: color,
      weight: 4,
      opacity: 0.6,
      fillOpacity: 0.65,
      fillColor: color
    };
    return style;
  }