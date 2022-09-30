// template para criação dos testes de cobertura da camada de controller
 import * as sinon from 'sinon';
 import chai from 'chai';
 const { expect } = chai;
 import { NextFunction, Request, Response } from 'express';
import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';
import {carMock, carMockWithID}  from '../../mocks/carMocks';
import CarController from '../../../controllers/car.controller';

 describe('Teste a Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel); 
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response; 

   before(() => {
     sinon
     .stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'read').resolves([carMock]);


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
   });

   after(()=>{
     sinon.restore();
   })

   it('Testa se o carro é criado corretamente', async () => {
    req.body = carMock;
    await carController.create(req, res);

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
   });

   describe('Testa se retorna um carro com id fornecido', () => {
    it('Testa se o carro com id correto é retornado corretamente', async () => {
      req.params = { id: carMockWithID._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Testa se retorna todos os carros', () => {
    it('Testa se o carro com id correto é retornado corretamente', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
  });

  

 });