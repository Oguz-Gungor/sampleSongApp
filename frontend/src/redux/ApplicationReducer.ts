enum ActionType {
  ANTHEM_PREVIEW
}


const initialState: IApplicationContentState = {
  anthemPreview: null,
};


interface IApplicationContentState {
    anthemPreview: string | null,
}

const reducer = (
  state: IApplicationContentState = initialState,
  action: any
) => {
  switch (action.type) {
    case ActionType.ANTHEM_PREVIEW:
      return {
        ...state,
        anthemPreview: action.payload ,
      };
    default:
      return state;
  }
};


export default { ActionType, reducer};
