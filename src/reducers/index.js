import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import socialReducer from './socialReducer';
// import chatReducer from './chatReducer';
// import mailReducer from './mailReducer';
// import kanbanReducer from './kanbanReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  social: socialReducer,
  // chat: chatReducer,
  // mail: mailReducer,
  // kanban: kanbanReducer,
  form: formReducer
});

export default rootReducer;
