export const initialProfileState = {
  userName: '',
  description: '',
  avatar: '',
  isUserNameDuplicated: false,
};

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return initialProfileState;
    }
    case 'updateUserName': {
      return { ...state, userName: action.value };
    }
    case 'updateDescription': {
      return { ...state, description: action.value };
    }
    case 'updateAvatar': {
      return { ...state, avatar: action.value };
    }
    case 'updateUserNameDuplicated': {
      return { ...state, isUserNameDuplicated: action.value };
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};
