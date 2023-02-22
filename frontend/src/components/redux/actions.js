export const TYPE = {
  getUserLogin: "GET_USER_LOGIN",
  logout: "USER_LOGOUT",
  userData: "USER_DATA",
  createPost: "CREATE_POST",
  getPosts: "GET_POSTS",
  updateLike: "UPDATE_LIKE",
  deletePost: "DELETE_POST",
  addComment: "ADD_COMMENT",
};

export const getUserLoginData = (data) => {
  return {
    type: TYPE.getUserLogin,
    payload: data,
  };
};

export const user_Logout = () => {
  return {
    type: TYPE.logout,
  };
};

export const user_Data = (data) => {
  return {
    type: TYPE.userData,
    payload: data,
  };
};

export const create_Post = (post) => {
  return {
    type: TYPE.createPost,
    payload: post,
  };
};

export const get_Posts = (posts) => {
  return {
    type: TYPE.getPosts,
    payload: posts,
  };
};

export const update_Like = (post) => {
  return {
    type: TYPE.updateLike,
    payload: post,
  };
};
export const delete_Post = (postId) => {
  return {
    type: TYPE.deletePost,
    payload: postId,
  };
};
export const add_Comment = (data) => {
  return {
    type: TYPE.addComment,
    payload: data,
  };
};
