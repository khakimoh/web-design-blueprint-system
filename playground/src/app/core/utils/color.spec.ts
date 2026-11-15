import { contrastRatio, parseColor, toHex } from './color';

describe('color utils', () => {
  it('parses hex and rgb() values produced by the stylesheet', () => {
    expect(parseColor('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseColor('rgb(51, 102, 204)')).toEqual({ r: 51, g: 102, b: 204 });
    expect(parseColor('not a color')).toBeNull();
  });

  it('computes WCAG contrast ratios', () => {
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#fff', '#fff')).toBeCloseTo(1, 5);
    expect(contrastRatio('#777', 'garbage')).toBeNull();
  });

  it('formats colors as hex for display', () => {
    expect(toHex('rgb(51, 102, 204)')).toBe('#3366cc');
  });
});
