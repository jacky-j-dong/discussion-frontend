/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  CREATE_POST,
  GET_POSTS,
  ADD_COMMENT
} from 'src/actions/socialActions';
import _ from 'lodash';

const initialState = {
  posts: []
};

const socialReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST: {
      const { social } = action.payload;
      return produce(state, (draft) => {
        draft.posts.push(social);
      });
    }

    case GET_POSTS: {
      const { socials } = action.payload;

      return produce(state, (draft) => {
        draft.posts = socials;
      });
    }

    case ADD_COMMENT: {
      const { social } = action.payload;
      const list = _.map(state.socials, function (item) {
        if (item.id === social.id) {
          return _.merge(item, social);
        }
        return item;
      });
      return produce(state, (draft) => {
        draft.posts = list;
      });
    }

    default: {
      return state;
    }
  }
};

export default socialReducer;
