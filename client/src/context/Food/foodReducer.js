export default (state, action) => {
  switch (action.type) {
    case "SEARCH_FOOD":
      return {
        ...state,
        macro: action.payload
      };
      case "NOT_FOUND":
        return{
          ...state,
          macro:action.payload
        }
    default:
      return state;
  }
};
