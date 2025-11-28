export interface LoginResponse {
  message: string;
  name: string;
  role: Array<string>;
  token: string;
}

export interface UserInterface {
  id: number;
  type: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  cep: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  bairro?: string;
  complemento?: string;
  cpf: string;
  crmv?: string;
  especialidade_vet?: string;
  pix?: string;
}

export interface CepInterface {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}


export interface VerifyTokenResponse {
  valid: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    type: string;
    permissions: Array<string>;
  }
}

export interface CardInterface {
  titulo: string;
  subtitulo: string;
  imagem: string;
}

export interface MenuInterface {
  label: string;
  link: string;
  icon?: string;
}


export interface HeaderContato {
  label: string;   // Fale Conosco
  wpp: string;  // imagem do whatsapp
  link: string;    // link whatsapp
}

export interface HeaderProfile {
  nome?: string;
  tipoUsu?: string;
  rotaUrl?: string;
  iconUrl?: string;
}

export interface TextoInicioInterface {
  imagem: string;
  titulo: string;
  subtitulo: string;
}


export interface PetListInterface {
  id: number;
  especie: string;
  nome: string;
  sexo: string;
  idade: string;
  tutor: string;
}

export interface TutorListInterface {
  id: number;
  nome: string;
  telefone?: string;
}

export interface VeterinarioListInterface {
  id: number;
  nome: string;
  especialidade: string;
  crmv: string;
}

export interface FichaPetInterface {
  tutor_name: string;
  pets: Array<PetInterface>;
}

export interface PetInterface {
  type?: string;
  id: number;
  nome: string;
  especie?: string;
  ano_nascimento?: Date;
  raca?: string;
  sexo?: boolean;
  peso?: number;
  temperamento?: string;
  possuiCarteirinha?: boolean;
  castrado?: boolean;
  tutor?: string;
  caso_clinico?: string;
  imagem?: string;
  user_id?: number;
  cor_pelagem?: string;
  casoClinico?: string;
  tutor_name?: string;
  consultas?: Array<PetConsulta>;
  vacinas?: Array<PetVacina>;
  prescricoes?: Array<PetPrescricao>;
}

export interface PetConsulta {
  id: number;
  vet_id: number;
  pet_id: number;
  servico_id: number;
  data_consulta: Date;
  anamnese: string;
  nome_vet?: string;
  nome_servico?: string;
  categoria_servico?: string;
}

export interface PetVacina {
  id: number;
  vet_id: number;
  pet_id: number;
  data_vacinacao: Date;
  data_reforco: Date;
  dose_atual: string;
  dose_total: string;
  tipo_vacina: string;
  fabricante: string;
  observacoes: string;
  estado_vacina: string;
  nome_vet: string;
}

export interface PetPrescricao {
  id: number;
  vet_id: number;
  pet_id: number;
  data_prescricao: Date;
  nome_medicamento: string;
  dosagem: string;
  farmacia: string;
  via: string;
  posologia: string;
  anexoUrl?: string;
}

export interface ServicosInterface {
  id: number;
  type?: string;
  nome: string;
  categoria: string;
  preco: number;
}
