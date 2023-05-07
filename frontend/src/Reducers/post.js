import { createReducer } from "@reduxjs/toolkit";

const initialstate = {
  loading: false,
  posts: [],
  user: [],
  error: null,
};
export const postReducer = createReducer(initialstate, {
  postRequest: (state) => {
    state.loading = true;
  },
  postSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload.data.posts;
    state.user = action.payload.data.user;
    state.error = null;
  },
  postFailure: (state, action) => {
    state.loading = false;
    state.posts = [];
    state.error = action.payload;
  },
  clearError: (state, action) => {
    state.error = null;
  },
});

const likeState = {
  loading: false,
  like: null,
  error: null,
};

export const postLike = createReducer(likeState, {
  likeRequest: (state) => {
    state.loading = true;
  },
  likeSuccess: (state, action) => {
    state.loading = false;
    state.like = action.payload;
  },
  likeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.like = null;
  },
});

const commentState = {
  loading: false,
  comment: null,
  error: null,
};

export const commentReducer = createReducer(commentState, {
  commentRequest: (state) => {
    state.loading = true;
  },
  commentSuccess: (state, action) => {
    state.loading = false;
    state.comment = action.payload;
    state.error = null;
  },
  commentFailure: (state, action) => {
    state.loading = false;
    state.comment = null;
    state.error = action.payload;
  },
});

const commentDtlUptState = {
  loading: false,
  message: null,
  error: null,
};

export const commentDelete = createReducer(commentDtlUptState, {
  commentDeleteRequest: (state) => {
    state.loading = true;
  },
  commentDeleteSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.error = null;
  },
  commentDeleteFailure: (state, action) => {
    state.loading = false;
    state.message = null;
    state.error = action.payload;
  },
});

export const commentUpdate = createReducer(commentState, {
  commentUpdateRequest: (state) => {
    state.loading = true;
  },
  commentUpdateSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.error = null;
  },
  commentUpdateFailure: (state, action) => {
    state.loading = false;
    state.message = null;
    state.error = action.payload;
  },
});

const initialPostState = {
  loading: false,
  posts: [],
  error: null,
};

export const usersPosts = createReducer(initialPostState, {
  usersPostsRequest: (state) => {
    state.loading = true;
  },
  usersPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
    state.error = null;
  },
  usersPostsFailure: (state, action) => {
    state.loading = false;
    state.posts = [];
    state.error = action.payload;
  },


  randomUsersPostRequest : (state,action)=>{
    state.loading = true;
  },
  randomUsersPostSuccess : (state,action)=>{
    state.loading =false;
    state.posts = action.payload;
    state.error = null;
  },
  randomUsersPostFailure : (state,action)=>{
    state.loading =false;
    state.posts = [];
    state.error = action.error
  }


});

//!adding new Post 


const addPostState={
  loading : false,
  post : [],
  error : null
}
export const addPostReducer = createReducer(addPostState,{
    addPostRequest :(state,action)=>{
      state.loading = true;
    },
    addPostSuccess : (state,action)=>{
      state.loading = false;
      state.post = action.payload;
      state.error = null
    },
    addPostFailure : (state,action)=>{
      state.loading = false;
      state.post = [];
      state.error = action.payload;
    }
})

export const updatePostReducer =createReducer(addPostState,{
   updatePostRequest : (state,action)=>{
      state.loading = true;
   },

   updatePostSuccess : (state,action)=>{
    state.loading = false;
    state.post = action.payload;
    state.error = null;
   },

   updatePostFailure : (state,action)=>{
    state.loading = false;
    state.post = [];
    state.error = action.payload;
   }
})

export const postDeleteReducer = createReducer(addPostState,{
  postDeleteRequest : (state,action)=>{
    state.loading = true;
  },
  postDeleteSuccess : (state,action)=>{
    state.loading = false ;
    state.post = action.payload;
    state.error = null;
  },
  postDeleteFailure : (state,action)=>{
    state.loading = false ;
    state.post = [];
    state.error = action.payload;
  }
})
