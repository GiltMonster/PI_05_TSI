export interface CardInterface {
  titulo: string;
  subtitulo:string;
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
  nome: string;
  tipoUsu: string; 
  rotaUrl?: string; 
  iconUrl?: string;
}

export interface TextoInicioInterface {
  imagem: string;
  titulo: string;
  subtitulo: string;
}