import { Libro } from '../models/Libro';

export class LibroRepository {
  private static instancia: LibroRepository;

  private libros: Libro[] = [
    { id: '1', title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
    { id: '2', title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes' },
    { id: '3', title: 'El Principito', author: 'Antoine de Saint-Exupéry' }
  ];

  private constructor() {}

  public static getInstance(): LibroRepository {
    if (!LibroRepository.instancia) {
      LibroRepository.instancia = new LibroRepository();
    }
    return LibroRepository.instancia;
  }

  public obtenerLibros(): Libro[] {
    return [...this.libros];
  }

  public agregarLibro(libro: Libro): void {
    this.libros.push(libro);
  }

  public eliminarLibro(id: string): void {
    this.libros = this.libros.filter(libro => libro.id !== id);
  }
}