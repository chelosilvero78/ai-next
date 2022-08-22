//export const basePath = hostName==="" && "http://localhost:3977/api";
const basePathApi=process.env.REACT_APP_API_URL

//console.log("basePathApi-->",basePathApi)    //--->   http://localhost:3977/api

// //como obtener detalles y datos de hostname-------------------inicio
// const protocolApi = "http";
// const hostApi = global.location.hostname
//   ? global.location.hostname
//   : "localhost";
// const portApi = "3977";
// const contexApi = "api";
// //como obtener detalles y datos de hostname-------------------fin

// const serverApi = `${protocolApi}://${hostApi}:${portApi}/${contexApi}`;

export const basePath = basePathApi;
export const API_PATH_PREFIX_EXCLUDE_VERSION=process.env.REACT_APP_API_PATH_PREFIX_EXCLUDE_VERSION
export const API_VERSION = process.env.REACT_APP_API_VERSION;
// export const listSetting ={
//   limitDefault:10,
//   pageDefault:1
// }
export const listSetting ={
  limitDefault:process.env.REACT_APP_PAGE_LIMIT_DEFAULT,
  pageDefault:process.env.REACT_APP_PAGE_FIRST_PAGE_DEFAULT
}