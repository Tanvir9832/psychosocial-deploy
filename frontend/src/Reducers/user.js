import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    loading : false,
    user : [],
    error : [],
    isAuthenticated : false
};

export const userReducer = createReducer(initialState,{

    //Login Reducer
    loginRequest : (state)=>{
        state.loading = true;
    },
    loginSuccess : (state,action)=>{
        state.loading = false;
        state.user =action.payload;
        state.isAuthenticated = true;
    },
    loginFailure : (state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },

    //Register Reducer
     registerRequest : (state)=>{
        state.loading = true;
     },
     registerSuccess :(state,action)=>{
        state.loading = false;
        state.action = action.payload;
     },
     registerFailure : (state,action)=>{
        state.loading = false;
        state.error = action.payload
     },

    //loaduser Reducer

    loadUserRequest :(state)=>{
        state.loading = true;
    },
    loadUserSuccess :(state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loadUserFailure :(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    }

})


const getUserInitialState ={
    loading : false,
    user : [],
    error : null
}

export const getAllUserReducer = createReducer(getUserInitialState,{
    getAllUserRequest : (state,action)=>{
        state.loading = true
    },
    getAllUserSuccess :(state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.error = null;
    },
    getAllUserFailure :(state,action)=>{
        state.loading = false;
        state.user = [];
        state.error = action.payload;
    },



    searchUserRequest : (state,action)=>{
        state.loading = true ;
    },
    searchUserSuccess : (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.error  = null;
    },
    searchUserFailure : (state,action)=>{
        state.loading = false ;
        state.user = [];
        state.error = action.payload ;
    }
})

//! MyProfile

const myProfileInitial ={
    loading : false,
    data : [],
    error : null
}
export const myProfileReducer = createReducer(myProfileInitial,{
    myProfileRequest : (state)=>{
        state.loading = true;
    },
    myProfileSuccess : (state,action)=>{
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    myProfileFailure : (state,action)=>{
        state.loading = false;
        state.data = [];
        state.error = action.payload;
    },

})

const myProfilePictureUploadInitial ={
    loading : false,
    data : [],
    error : null,
}

export const myProfilePictureUpload = createReducer(myProfilePictureUploadInitial,{
    myProfilePictureUploadRequest : (state)=>{
        state.loading = true;
    },
    myProfilePictureUploadSuccess : (state,action)=>{
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    myProfilePictureUploadFailure : (state,action)=>{
        state.loading = false;
        state.data = [];
        state.error = action.payload
    }

})

const updateInitial={
    loading : false,
    data : [],
    error : null
}

export const profileUpdate =createReducer(updateInitial,{
    profileUpdateRequest :(state,action)=>{
        state.loading =true;
    },
    profileUpdateSuccess : (state,action)=>{
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    profileUpdateFailure : (state,action)=>{
        state.loading = false;
        state.data = [];
        state.error = action.payload;
    },




    passwordUpdateRequest : (state)=>{
        state.loading = true;
    },
    passwordUpdateSuccess : (state,action)=>{
        state.loading =false;
        state.data = action.payload;
        state.error = null;
    },
    passwordUpdateFailure : (state,action)=>{
        state.loading =false;
        state.data = [];
        state.error = action.payload;
    },




    deleteMyProfileRequest :(state,action)=>{
        state.loading = true;
    },
    deleteMyProfileSuccess :(state,action)=>{
        state.loading = false;
        state.data =action.payload;
        state.error = null;
    },
    deleteMyProfileFailure : (state,action)=>{
        state.loading = false;
        state.data = [];
        state.error = action.payload;
    },


    forgetPasswordRequest : (state,action)=>{
        state.loading = true;
    },
    forgetPasswordSuccess : (state,action)=>{
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    forgetPasswordFailure : (state,action)=>{
        state.loading = false;
        state.data = [];
        state.error = action.payload;
    },


    forgetPasswordFinalRequest : (state,action)=>{
        state.loading = true;
    },
    forgetPasswordFinalSuccess : (state, action)=>{
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    forgetPasswordFianlFailure : (state,action)=>{
        state.loading =false;
        state.data = [];
        state.error = action.payload;
    },


    //!Follow Unfollow Reducer

    followUserRequest :(state , action)=>{
        state.loading = true;
    },
    followUserSuccess : (state,action)=>{
        state.loading = false;
        state.data = action.payload;
        state.error = null
    },
    followUserFailure : (state,action)=>{
        state.loading = false;
        state.data = [];
        state.error = action.payload;
    }
    ,

    //! Email Verification Reducer   profileUpdate

    emailVerificationRequest : (state , action)=>{
        state.loading = true;
    },
    emailVerificationSuccess : (state,action)=>{
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    emailVerificationFailure : (state , action) =>{
        state.loading = false;
        state.data = [];
        state.error = action.payload ;
    }


})

const initialSingleUser={
    loading : false,
    data : [],
    error : null
}

export const singleUserReducer = createReducer(initialSingleUser,{
    singleUserRequest : (state , action)=>{
        state.loading = true;
    },
    singleUserSuccess : (state,action)=>{
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    singleUserFailure : (state,action)=>{
        state.loading = false;
        state.data = [];
        state.error = action.payload;
    }
})


