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
  link: string;    // link whatsapp
}

export interface HeaderProfile {
  nome: string;
  tipoUsu: string; 
  rotaUrl?: string; 
  iconUrl?: string;
}