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
  especialidade?:string;
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
  cor_pelagem?: string;
  castrado?: boolean;
  tutor?: string;
  caso_clinico?: string;
  imagem?: string;
  consultas?: Array<PetConsulta>;
  user_id?: number;
  cor?: string;
  casoClinico?: string;
  tutorName?: string;
}

export interface PetConsulta {
  id: number;
  vet_id: number;
  servico_id: number;
  data_consulta: Date;
  anamnese: string;
  nome_vet?: string;
  nome_servico?: string;
  categoria_servico?: string;
}

export interface ServicosListInterface {
  id: number;
  titulo: string;
  categoria: string;
  valor: number;
}
