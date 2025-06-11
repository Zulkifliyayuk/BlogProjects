export const adjustClamp = (
  min: number, //in px
  max: number, //in px
  maxContainer: number //in px
): string => {
  const minRem = (min / 16).toFixed(2) + 'rem';
  const maxRem = (max / 16).toFixed(2) + 'rem';
  const preferred = ((max / maxContainer) * 100).toFixed(2) + 'vw';

  return `clamp(${minRem}, ${preferred}, ${maxRem})`;
};

export const adjustFlexLeft = (
  widthLeft: number, //in px
  widthRight: number, //in px
  basis: number //in px
): React.CSSProperties => {
  const growLeft = widthLeft - basis;
  const growRight = widthRight - basis;
  const availableGrow = growLeft + growRight;
  const flexGrowLeft = growLeft / availableGrow;
  const flexBasis = `${basis / 16}rem`;
  return {
    flexGrow: flexGrowLeft * 10,
    flexBasis,
  };
};

export const adjustFlexRight = (
  widthLeft: number, //in px
  widthRight: number, //in px
  basis: number //in px
): React.CSSProperties => {
  const growLeft = widthLeft - basis;
  const growRight = widthRight - basis;
  const availableGrow = growLeft + growRight;
  const flexGrowRight = growRight / availableGrow;
  const flexBasis = `${basis / 16}rem`;
  return {
    flexGrow: flexGrowRight * 10,
    flexBasis,
  };
};
