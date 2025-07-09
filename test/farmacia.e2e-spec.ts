/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let categoriaID: any;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [__dirname + './../src/**/entities/*.entity.ts'],
        synchronize: true,
        dropSchema: true,
      }),
      AppModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('Teste do Módulo Categoria (e2e)', () => {
  it('01 - Deve criar uma nova categoria', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/categorias')
      .send({
        categoria: 'categoria x',
      })
      .expect(201);

    categoriaID = resposta.body.id;
  });

  it('02 - Deve  apresentar erro ao atualizar categoria com id inválido', async () => {
    return await request(app.getHttpServer())
      .put('/categorias')
      .send({
        id: 40,
        categoria: 'categoria y',
      })
      .expect(404);
  });

  it('03 - Deve  exibir a categoria pesquisada', async () => {
    return await request(app.getHttpServer())
      .get(`/categorias/${categoriaID}`)
      .expect(200);
  });
});

describe('Teste do Módulo Produto (e2e)', () => {
  let produtoID: number;

  it('01 - Deve criar um novo produto', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/produtos')
      .send({
        nome: 'produto a',
        descricao: 'descrição do produto',
        preco: 20,
        marca: 'marca do produto',
        categoria: categoriaID,
      })
      .expect(201);

    produtoID = resposta.body.id;
  });

  it('02 - Deve  atualizar item com desconto', async () => {
    return await request(app.getHttpServer())
      .put('/produtos/cupom')
      .send({
        id: produtoID,
      })
      .expect(200);
  });

  it('03 - Deve  exibir todos os produtos', async () => {
    return await request(app.getHttpServer()).get('/produtos').expect(200);
  });
});
