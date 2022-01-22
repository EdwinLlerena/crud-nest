import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdcutoDto } from './dto/producto.dto';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: ProductoRepository,
  ) {}

  async getAll(): Promise<ProductoEntity[]> {
    const list = await this.productoRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'la lista esta vacia' });
    }
    return list;
  }
  async findById(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne(id);
    if (!producto) {
      throw new NotFoundException({ message: 'No existe' });
    }
    return producto;
  }

  async findByNombre(nombre: string): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({ nombre: nombre });

    return producto;
  }

  async create(dto: ProdcutoDto): Promise<any> {
    const producto = this.productoRepository.create(dto);
    await this.productoRepository.save(producto);
    return { message: `Producto ${producto.nombre} Creado` };
  }
  async update(id: number, dto: ProdcutoDto): Promise<any> {
    const producto = await this.findById(id);
    dto.nombre
      ? (producto.nombre = dto.nombre)
      : (producto.nombre = producto.nombre);
    dto.precio
      ? (producto.precio = dto.precio)
      : (producto.precio = producto.precio);
    await this.productoRepository.save(producto);
    return { message: `Producto ${producto.nombre} Actualizado` };
  }
  async delete(id: number): Promise<any> {
    const producto = await this.productoRepository.findOne(id);
    await this.productoRepository.delete(producto);
    return { message: `Producto ${producto.nombre} Eliminado` };
  }
}
