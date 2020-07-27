import axios from 'src/utils/axios';

export const CREATE_POST = '@social/create-post';
export const GET_POSTS = '@social/get-posts';
export const ADD_COMMENT = '@social/add-comment';


export function getPosts(userId) {
  const request = axios.get(`/api/posts/`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: GET_POSTS,
      payload: response.data
    })).catch((error) => {
      console.log(error);
    });
  };
}


export function createPost(userId, message) {
  const request = axios.post(`/api/posts/`, {
    userId,
    message
  });

  return (dispatch) => {
    request.then((response) => dispatch({
      type: CREATE_POST,
      payload: response.data
    }));
  };
}


export function addComment(postId, userId, comment) {
  const request = axios.put(`/api/posts/${postId}`, {
    userId,
    comment
  });

  return (dispatch) => {
    request.then((response) => dispatch({
      type: ADD_COMMENT,
      payload: response.data
    }));
  };
}
