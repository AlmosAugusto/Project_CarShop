// template para criação dos testes de cobertura da camada de model
import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/car.model'
import { Model } from 'mongoose';
import  {carMock, carMockID}  from '../../mocks/carMocks'

describe('Teste a Model Car', () => {
  const carModel = new CarModel();
   before(async () => {
    sinon
       .stub(Model, 'create')
       .resolves(carMockID);
   });

   after(()=>{
     sinon.restore();
   })

   it('Testa se o carro é criado corretamente', async () => {
    const newCar = await carModel.create(carMock);
    console.log(newCar, 'line 23');
    
    expect(newCar).to.be.deep.equal(carMockID)
   });

 });