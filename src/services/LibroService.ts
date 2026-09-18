import { Libro } from '../models/Libro';
import { LibroRepository } from '../repositories/LibroRepository';

export class LibroService {
  private repository: LibroRepository;

  constructor() {
    this.repository = LibroRepository.getInstance();
  }

  obtenerLibros(): Libro[] {
    return this.repository.obtenerLibros();
  }

  agregarLibro(libro: Libro): void {
    this.repository.agregarLibro(libro);
  }

  eliminarLibro(id: string): void {
    this.repository.eliminarLibro(id);
  }

  obtenerInstanciaRepo(): LibroRepository {
    return this.repository;
  }
}

const service1 = new LibroService();
const service2 = new LibroService();

const repo1 = service1.obtenerInstanciaRepo();
const repo2 = service2.obtenerInstanciaRepo();

console.log('COMPROBACIÓN DEL PATRÓN SINGLETON');
console.log('¿Son ambas instancias idénticas?:', repo1 === repo2);
