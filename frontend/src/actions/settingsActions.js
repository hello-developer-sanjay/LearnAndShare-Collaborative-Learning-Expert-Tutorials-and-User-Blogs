// actions/settingsActions.js
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const UPDATE_COLOR = 'UPDATE_COLOR';
export const UPDATE_FONT_FAMILY = 'UPDATE_FONT_FAMILY';
export const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE';
export const UPDATE_LINE_HEIGHT = 'UPDATE_LINE_HEIGHT';
export const UPDATE_BACKGROUND_IMAGE = 'UPDATE_BACKGROUND_IMAGE';
export const UPDATE_BORDER_RADIUS = 'UPDATE_BORDER_RADIUS';
export const UPDATE_BOX_SHADOW = 'UPDATE_BOX_SHADOW';

export const updateLayout = (layout) => ({
  type: UPDATE_LAYOUT,
  payload: layout,
});

export const updateColor = (color) => ({
  type: UPDATE_COLOR,
  payload: color,
});

export const updateFontFamily = (fontFamily) => ({
  type: UPDATE_FONT_FAMILY,
  payload: fontFamily,
});

export const updateFontSize = (fontSize) => ({
  type: UPDATE_FONT_SIZE,
  payload: fontSize,
});

export const updateLineHeight = (lineHeight) => ({
  type: UPDATE_LINE_HEIGHT,
  payload: lineHeight,
});

export const updateBackgroundImage = (backgroundImage) => ({
  type: UPDATE_BACKGROUND_IMAGE,
  payload: backgroundImage,
});

export const updateBorderRadius = (borderRadius) => ({
  type: UPDATE_BORDER_RADIUS,
  payload: borderRadius,
});

export const updateBoxShadow = (boxShadow) => ({
  type: UPDATE_BOX_SHADOW,
  payload: boxShadow,
});
