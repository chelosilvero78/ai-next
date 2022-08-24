
// export const AUTH_CHECKING_FINISH= 'AUTH_CHECKING_FINISH';  // adaptacion masr
// export const AUTH_START_LOGIN= 'AUTH_START_LOGIN';    //--> fernando herrera
// export const AUTH_START_REGISTER= 'AUTH_START_REGISTER';  //--> fernando herrera
// export const AUTH_START_TOKEN_RENEW= 'AUTH_START_TOKEN_RENEW';  //--> fernando herrera

export const AUTH_LOGIN_REQUEST= 'AUTH_LOGIN_REQUEST';  // adaptacion masr
export const AUTH_LOGIN_SUCCESS= 'AUTH_LOGIN_SUCCESS';  //adaptacion masr
export const AUTH_CHECK_TOKEN_RENEW= 'AUTH_CHECK_TOKEN_RENEW';  //--> adaptacion masr
export const AUTH_LOGIN_FAIL= 'AUTH_LOGIN_FAIL';
export const AUTH_LOGOUT= 'AUTH_LOGOUT';

export const AUTH_REGISTER_REQUEST= 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS= 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAIL= 'AUTH_REGISTER_FAIL';

export const AUTH_DETAILS_REQUEST= 'AUTH_DETAILS_REQUEST';
export const AUTH_DETAILS_SUCCESS= 'AUTH_DETAILS_SUCCESS';
export const AUTH_DETAILS_FAIL= 'AUTH_DETAILS_FAIL';
export const AUTH_DETAILS_RESET= 'AUTH_DETAILS_RESET';


//modelo de Brad Traversy--------------------------------
// export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
// export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
// export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
// export const USER_LOGOUT = 'USER_LOGOUT'

//modelo Fernando Herrera, este enfoque podemos usar para mas adelante si resulta mas comodo
//definirlo y usarlo como objeto javacript
// export const types = {
//     uiOpenModal: '[ui] Open modal',
//     uiCloseModal: '[ui] Close modal',

//     eventSetActive: '[event] Set Active',
//     eventLogout: '[event] Logout event',
//     evetStartAddNew: '[event] Start add new',
//     eventAddNew: '[event] Add new',
//     eventClearActiveEvent: '[event] Clear active event',
//     eventUpdated: '[event] Event updated',
//     eventDeleted: '[event] Event deleted',
//     eventLoaded: '[event] Events loaded',

//     authCheckingFinish: '[auth] Finish checking(equivalente a loading) login state',
//     authStartLogin: '[auth] Start login',
//     authLogin: '[auth] Login',
//     authStartRegister: '[auth] Start Register',
//     authStartStartTokenRenew: '[auth] Start token renew',
//     authLogout: '[auth] Logout',
// }