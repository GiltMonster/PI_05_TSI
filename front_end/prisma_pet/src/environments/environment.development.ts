//  const end_point_base = 'https://prisma-pet-api.up.railway.app/api';
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
  API_URL_ADMIN_UPDATE: `${end_point_base}/adm/editarAdmin`,

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
  API_URL_ADMIN_PET_BY_USER_ID: `${end_point_base}/adm/getPetsByUserId`,
  API_URL_ADMIN_PET_REGISTER: `${end_point_base}/adm/registrarPet`,
  API_URL_ADMIN_PET_UPDATE: `${end_point_base}/adm/editarPet`,
  API_URL_ADMIN_PET_DELETE: `${end_point_base}/adm/deletarPet`,

  // --- veterinario ---
  API_URL_VET_GET_VET_BY_ID: `${end_point_base}/vet/getVetById`,
  API_URL_VET_UPDATE: `${end_point_base}/vet/editarVet`,
  API_URL_VET_PET_LIST: `${end_point_base}/adm/getPets`,

  API_URL_VET_GET_TUTORS_LIST: `${end_point_base}/vet/getAllTutors`,
  API_URL_VET_GET_ALL_PETS: `${end_point_base}/vet/getPets`,
  API_URL_VET_GET_PET_BY_ID: `${end_point_base}/vet/getPetById`,
  API_URL_VET_GET_PETS_BY_USER_ID: `${end_point_base}/vet/getPetsByUserId`,
  API_URL_VET_PET_REGISTER: `${end_point_base}/vet/registrarPet`,
  API_URL_VET_PET_UPDATE: `${end_point_base}/vet/editarPet`,

  // --- tutor ---
  API_URL_CLIENTE_GET_CLIENTE_BY_ID: `${end_point_base}/cliente/getClienteById`,
  API_URL_CLIENTE_UPDATE: `${end_point_base}/cliente/editarCliente`,

  API_URL_CLIENTE_GET_PET_BY_ID: `${end_point_base}/cliente/getPetById`,
  API_URL_CLIENTE_GET_PETS_BY_USER_ID: `${end_point_base}/cliente/getPetsByUserId`,
  API_URL_CLIENTE_PET_REGISTER: `${end_point_base}/cliente/registrarPet`,
  API_URL_CLIENTE_PET_UPDATE: `${end_point_base}/cliente/editarPet`,
  API_URL_CLIENTE_PET_DELETE: `${end_point_base}/cliente/deletarPet`,

  // --- servicos ---
  API_URL_SERVICO_LIST_ALL: `${end_point_base}/servico/all`,
  API_URL_SERVICO_BY_ID: `${end_point_base}/servico/`, // + id
  API_URL_SERVICO_CREATE: `${end_point_base}/servico/novo`,
  API_URL_SERVICO_UPDATE: `${end_point_base}/servico/editar`,
  API_URL_SERVICO_DELETE: `${end_point_base}/servico/deletar/`, // + id

  // --- Ficha pet: ---
  // --- Consulta ---
  API_URL_VET_CADASTRAR_CONSULTA: `${end_point_base}/vet/novaConsulta`,
  API_URL_VET_EDITAR_CONSULTA: `${end_point_base}/vet/editarConsulta`,
  API_URL_VET_DELETAR_CONSULTA: `${end_point_base}/vet/deletarConsulta`, // + id

  // --- Vacina ---
  API_URL_VET_CADASTRAR_VACINA: `${end_point_base}/vet/novaVacina`,
  API_URL_VET_EDITAR_VACINA: `${end_point_base}/vet/editarVacina`,
  API_URL_VET_DELETAR_VACINA: `${end_point_base}/vet/deletarVacina`, // + id
};
