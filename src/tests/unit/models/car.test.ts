// template para criação dos testes de cobertura da camada de model
import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/car.model'
import { Model } from 'mongoose';
import  {carMock, carMockWithID}  from '../../mocks/carMocks'

describe('Teste a Car Model', () => {
  const carModel = new CarModel();
   before(async () => {
    sinon
       .stub(Model, 'create')
       .resolves(carMockWithID);
   });

   after(()=>{
     sinon.restore();
   })

   it('Testa se o carro é criado corretamente', async () => {
    const newCar = await carModel.create(carMock);
    console.log(newCar, 'line 23');
    
    expect(newCar).to.be.deep.equal(carMockWithID)
   });

 });