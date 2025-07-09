import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from './../entities/produto.entity';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK) //code 200
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findAllByNome(nome);
  }

  @Get('/:descricao')
  @HttpCode(HttpStatus.OK)
  findAllByDescricao(
    @Param('descricao') descricao: string,
  ): Promise<Produto[]> {
    return this.produtoService.findAllByDescricao(descricao);
  }

  @Get('/:marca')
  @HttpCode(HttpStatus.OK)
  findAllByMarca(@Param('marca') marca: string): Promise<Produto[]> {
    return this.produtoService.findAllByMarca(marca);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  orderByMaiorPreco(): Promise<Produto[]> {
    return this.produtoService.orderByMaiorPreco();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  orderByMenorPreco(): Promise<Produto[]> {
    return this.produtoService.orderByMenorPreco();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) //code 201
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Put('/:marca')
  @HttpCode(HttpStatus.OK)
  descontoMarca(@Param('marca') marca: string): Promise<Produto[]> {
    return this.produtoService.descontoMarca(marca);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  descontoCategoria(@Body() produto: Produto): Promise<Produto[]> {
    return this.produtoService.descontoCategoria(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  descontoCupom(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.descontoCupom(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) //code 204
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
