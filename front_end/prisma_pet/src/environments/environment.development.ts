const end_point_base = 'http://127.0.0.1:8000/api';

export const environment = {
  production: false,

  // --- auth ---
  API_URL_AUTH_LOGIN: `${end_point_base}/login`,
  API_URL_AUTH_LOGOUT: `${end_point_base}/logout`,
  API_URL_AUTH_ME: `${end_point_base}/me`,
  API_URL_AUTH_MY_TYPE: `${end_point_base}/myType`,
  API_URL_AUTH_VERIFY_TOKEN: `${end_point_base}/verifyToken`,

  // --- register ---
  API_URL_REGISTER: `${end_point_base}/register`,

  // --- admin ---
  API_URL_ADMIN_VET_LIST: `${end_point_base}/adm/getVets`,
  API_URL_ADMIN_VET_BY_ID: `${end_point_base}/adm/getVetById`,
  API_URL_ADMIN_VET_UPDATE: `${end_point_base}/adm/editarVet`,
  API_URL_ADMIN_VET_DELETE: `${end_point_base}/adm/deletarVet`,

  API_URL_ADMIN_CLIENTE_LIST: `${end_point_base}/adm/getClientes`,
  API_URL_ADMIN_CLIENTE_BY_ID: `${end_point_base}/adm/getClienteById`,
  API_URL_ADMIN_CLIENTE_UPDATE: `${end_point_base}/adm/editarCliente`,
  API_URL_ADMIN_CLIENTE_DELETE: `${end_point_base}/adm/deletarCliente`,

  API_URL_ADMIN_PET_LIST: `${end_point_base}/adm/getPets`,
  API_URL_ADMIN_PET_BY_ID: `${end_point_base}/adm/getPetById`,
  API_URL_ADMIN_PET_BY_USER_ID: `${end_point_base}/adm/getPetByUserId`,
  API_URL_ADMIN_PET_CREATE: `${end_point_base}/adm/registrarPet`,
  API_URL_ADMIN_PET_UPDATE: `${end_point_base}/adm/editarPet`,
  API_URL_ADMIN_PET_DELETE: `${end_point_base}/adm/deletarPet`,

  // --- veterinario ---

  // --- tutor ---

  // --- pet ---

  // --- servicos ---

};
