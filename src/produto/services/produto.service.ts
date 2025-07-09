import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { CategoriaService } from './../../categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private CategoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND); //code 404

    return produto;
  }

  async findAllByNome(nome: string): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND); //code 404

    return produto;
  }

  async findAllByDescricao(descricao: string): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND); //code 404

    return produto;
  }

  async findAllByMarca(marca: string): Promise<Produto[]> {
    const buscamarca = await this.produtoRepository.find({
      where: {
        marca: ILike(`%${marca}%`),
      },
      relations: {
        categoria: true,
      },
    });

    if (!buscamarca)
      throw new HttpException('Marca não encontrada.', HttpStatus.NOT_FOUND); //code 404

    return buscamarca;
  }

  async orderByMaiorPreco(): Promise<Produto[]> {
    const produtos = await this.findAll();
    const lista = [...produtos]; //cria cópia da lista de produtos
    lista.sort((a, b) => b.preco - a.preco); //ordena do maior para o menor
    return lista;
  }

  async orderByMenorPreco(): Promise<Produto[]> {
    const produtos = await this.findAll();
    const lista = [...produtos]; //cria cópia da lista de produtos
    lista.sort((a, b) => a.preco - b.preco); //ordena do menor para o maior
    return lista;
  }

  async create(produto: Produto): Promise<Produto> {
    await this.CategoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.CategoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  //para aplicar descontos em todos os produtos de uma mesma marca
  async descontoMarca(marca: string): Promise<Produto[]> {
    const buscamarca = await this.findAllByMarca(marca); //crio uma lista com os produtos
    let desconto: number;

    for (const produto of buscamarca) {
      //para cada produto daquele grupo, aplico o desconto
      desconto = produto.preco * 0.1; //no futuro, posso colocar variável para o cálculo de descontos e/ou criar lista de opções
      produto.preco = produto.preco - desconto; //atualizo o item
    }

    return await this.produtoRepository.save(buscamarca); //atualizo o grupo
  }

  async descontoCategoria(produto: Produto): Promise<Produto[]> {
    const buscaCategoria = await this.CategoriaService.findById(
      produto.categoria.id,
    );
    let desconto: number;

    if (buscaCategoria.produto.length === 0) {
      throw new HttpException(
        'Não há produtos disponíveis para aplicar o desconto.',
        HttpStatus.NOT_FOUND,
      );
    }

    for (const produto of buscaCategoria.produto) {
      desconto = produto.preco * 0.1;
      produto.preco = produto.preco - desconto;
    }

    return await this.produtoRepository.save(buscaCategoria.produto);
  }

  async descontoCupom(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    let desconto: number;
    // let cupom

    // eslint-disable-next-line prefer-const
    desconto = produto.preco * 0.15;
    produto.preco = produto.preco - desconto;

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
