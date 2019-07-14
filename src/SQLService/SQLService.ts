import {Distillation} from '../models/Distillation/Distillation'
import * as JsStore from 'jsstore'
import _ from 'lodash';
 
export class SQLService {

    connection: any;
    db: any;
    dbName: string = "Distillation"
    tableName: string = "DistillationData";
    async initDB(): Promise<void>{
        console.log('JSStore:', JsStore);
        this.connection = new JsStore.Instance();
        const tableDistillation = {
            name: this.tableName,
            columns: {
                _id: {primaryKey: true, dataType: "string"},
                name: {notNull: true, dataType: "string"},
                taxID: {notNull: true, dataType: "string"},
                date: {notNull: true, dataType: "string"},
                address: {notNull: true, dataType: "string"},
                originID: {notNull: true, dataType: "string"},
                HLF: {notNull: true, dataType: "number"},
                weightInKilograms: {notNull: true, dataType: "number"},               
            }
        }
        this.db = {
            name: this.dbName,
            tables: [tableDistillation]
      }
      await this.connection.initDb(this.db);
    }

    findAll = async () => {
        return await this.connection.select({from: this.tableName});
    }

    findAllByName = async (nameToFind: string): Promise<Distillation[]> => {
        return Distillation.fromSQLObjects(await this.db.find({ name: nameToFind}));
    }
    findAllByTaxID = async (taxIDToFind: string): Promise<Distillation[]> => {
        return Distillation.fromSQLObjects(await this.db.find({taxID: taxIDToFind}));
    }

    sumAllHLFByName = async (nameToFind: string): Promise<number> => {
        return await this.connection.select({from: this.tableName, where: {name: nameToFind}, aggregate: {sum: 'HLF'}});
    }

    sumAllHLFByTaxID = async (taxIDToFind: string): Promise<number> => {
        return await this.connection.select({from: this.tableName, where: {taxID: taxIDToFind}, aggregate: {sum: 'HLF'}});
    }

    sumAllWeightByName = async (nameToFind: string): Promise<number> => {
        return await this.connection.select({from: this.tableName, where: {name: nameToFind}, aggregate: {sum: 'weightInKilograms'}});
    }

    sumAllWeightByTaxID = async (taxIDToFind: string): Promise<number> => {
        return await this.connection.select({from: this.tableName, where: {taxID: taxIDToFind}, aggregate: {sum: 'weightInKilograms'}});
    }

    createNewDistillation = async (modelObject: Distillation): Promise<Distillation> => {
        await this.connection.insert({from: this.tableName, value:modelObject.toSQLObject()});
        return Distillation.fromSQLObject(await this.connection.find({from: this.tableName, value: modelObject._id}));
    }

    updateDistillation = async (modelObject: Distillation): Promise<Distillation> => {
        await this.connection.update({ 
            in: this.tableName,
          set: Object.assign({}, _.omit(Distillation, '_id')),
          where: {_id: modelObject._id,}
      });
      return Distillation.fromSQLObject(await this.connection.find({from: this.tableName, value: modelObject._id}));
    }

    deleteDistillation = async (modelObject: Distillation): Promise<any> => {
        return await this.db.remove({_id: modelObject._id});
    }
}