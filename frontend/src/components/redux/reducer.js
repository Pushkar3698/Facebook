import { TYPE } from "./actions";

const INITIAL_STATE = {
  isAuth: false,
  token: null,
  userData: null,
  posts: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  if (action.type === TYPE.getUserLogin) {
    const { isAuth, token, userId } = action.payload;
    return {
      ...state,
      isAuth: isAuth,
      token: token,
      userId: userId,
    };
  } else if (action.type === TYPE.logout) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    return {
      ...state,
      isAuth: false,
      token: null,
      userId: null,
    };
  } else if (action.type === TYPE.userData) {
    return {
      ...state,
      userData: action.payload,
    };
  } else if (action.type === TYPE.createPost) {
    return {
      ...state,
      posts: [action.payload, ...state.posts],
    };
  } else if (action.type === TYPE.getPosts) {
    return {
      ...state,
      posts: action.payload,
    };
  } else if (action.type === TYPE.updateLike) {
    const { _id } = action.payload;
    const findIndex = state.posts.findIndex(
      (el) => el._id.toString() === _id.toString()
    );
    const posts = [...state.posts];
    posts[findIndex] = action.payload;

    return {
      ...state,
      posts: posts,
    };
  } else if (action.type === TYPE.deletePost) {
    const filteredPosts = state.posts.filter(
      (el) => el._id.toString() !== action.payload.toString()
    );

    return {
      ...state,
      posts: filteredPosts,
    };
  } else if (action.type === TYPE.addComment) {
    const { comments, id } = action.payload;

    const findIndex = state.posts.findIndex((el) => el._id.toString() === id);

    const newPosts = [...state.posts];

    newPosts[findIndex].comments = comments;

    return {
      ...state,
      posts: newPosts,
    };
  }
  return state;
};

export default reducer;
