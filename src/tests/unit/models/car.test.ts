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
    sinon
       .stub(Model, 'findOne')
       .resolves(carMockWithID);   
   });

   after(()=>{
     sinon.restore();
   })

   it('Testa se o carro é criado corretamente', async () => {
    const newCar = await carModel.create(carMock);
    // console.log(newCar, 'line 23');
    
    expect(newCar).to.be.deep.equal(carMockWithID)
   });

   it('Testa se o carro com id correto é retornado corretamente', async () => {
    const carFound = await carModel.readOne('4edd40c86762e0fb12000003');
    
    expect(carFound).to.be.deep.equal(carMockWithID)
   });

   it('Testa se o carro com id incorreto se a mensagem de erro é retornado corretamente', async () => {
    try {
      await carModel.readOne('111111111111111111111111111');
    } catch (error: any) {
      console.log(error.message, 'line 41');
      
      expect(error.message).to.be.deep.eq('InvalidMongoId')
    }
    });

   

 });