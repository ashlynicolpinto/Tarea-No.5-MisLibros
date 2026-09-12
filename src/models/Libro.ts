export class Libro {
  id: string;
  titulo: string;
  autor: string;
  anio: number;

  constructor(id: string, titulo: string, autor: string, anio: number) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
  }
}