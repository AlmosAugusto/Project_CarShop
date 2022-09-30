// template para criação dos testes de cobertura da camada de service
 import * as sinon from 'sinon';
 import chai from 'chai';
const { expect } = chai;
import { ZodError } from 'zod';
import { Model } from 'mongoose';
import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';
import {carMock, carMockWithID}  from '../../mocks/carMocks';
import { ErrorTypes } from '../../../errors/catalogs';



 describe('Teste a Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel); 
   before(async () => {
    sinon
    .stub(Model, 'create')
    .resolves(carMockWithID);
    sinon.stub(Model, 'findOne')
		.onCall(0).resolves(carMockWithID) 
		.onCall(1).resolves(null); 
   });

   after(()=>{
     sinon.restore();
   })

   it('Testa se o carro é criado corretamente', async () => {
    const carCreated = await carService.create(carMock);

    expect(carCreated).to.be.deep.equal(carMockWithID);
   });

   it('Testa se o carro é criado incorretamente', async () => {
    let error;
    try {
      await carService.create({
        model: '',
        year: 0,
        color: '',
        buyValue: 0,
        doorsQty: 0,
        seatsQty: 0
      });
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(ZodError);
  });

  describe('Testa se retorna um carro com id fornecido', () => {
		it('Testa se o carro com id correto é retornado corretamente', async () => {
			const carFound = await carService.readOne(carMockWithID._id);

			expect(carFound).to.be.deep.equal(carMockWithID);
		});

		it('Failure', async () => {
			try {
				await carService.readOne(carMockWithID._id);
			} catch (error:any) {
        expect(error, 'error should be defined').not.to.be.undefined;
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}

		});
	});

 });