// reducers/settingsReducer.js
import { UPDATE_LAYOUT, UPDATE_COLOR, UPDATE_FONT_FAMILY, UPDATE_FONT_SIZE, UPDATE_LINE_HEIGHT, UPDATE_BACKGROUND_IMAGE, UPDATE_BORDER_RADIUS, UPDATE_BOX_SHADOW } from '../actions/settingsActions';

const initialState = {
  layout: 'fixed',
  color: '#333',
  fontFamily: 'Arial',
  fontSize: 16,
  lineHeight: 1.5,
  backgroundImage: '',
  borderRadius: 0,
  boxShadow: 'none',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    case UPDATE_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    case UPDATE_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload,
      };
    case UPDATE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload,
      };
    case UPDATE_LINE_HEIGHT:
      return {
        ...state,
        lineHeight: action.payload,
      };
    case UPDATE_BACKGROUND_IMAGE:
      return {
        ...state,
        backgroundImage: action.payload,
      };
    case UPDATE_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.payload,
      };
    case UPDATE_BOX_SHADOW:
      return {
        ...state,
        boxShadow: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
