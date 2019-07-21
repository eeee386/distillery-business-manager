import {Distillation} from '../models/Distillation/Distillation'
import PouchDB from 'pouchdb-browser';
import _ from 'lodash';
 
export class SQLService {

    db: any;

    constructor(){
        this.db = new PouchDB('Distillation');
    }

    findAll = async () => {
        return Distillation.fromSQLObjects(await this.db.allDocs());
    }

    findAllByName = async (nameToFind: string): Promise<Distillation[]> => {
        return Distillation.fromSQLObjects(await this.db.find({selector: { name: nameToFind}}));
    }
    findAllByTaxID = async (taxIDToFind: string): Promise<Distillation[]> => {
        return Distillation.fromSQLObjects(await this.db.find({selector: { taxID: taxIDToFind}}));
    }

    sumAllHLFByName = async (nameToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { name: nameToFind}});
        return res.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.HLF, 0)
    }

    sumAllHLFByTaxID = async (taxIDToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { taxID: taxIDToFind }});
        return res.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.HLF, 0)
    }

    sumAllWeightByName = async (nameToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { name: nameToFind}});
        return res.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.weightInKilograms, 0)
    }

    sumAllWeightByTaxID = async (taxIDToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { taxID: taxIDToFind }});
        return res.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.weightInKilograms, 0);
    }

    createNewDistillation = async (modelObject: Distillation): Promise<Distillation> => {
        console.log('modelObject: ', modelObject);
        return Distillation.fromSQLObject(await this.db.post(modelObject.toSQLObject()));
    }

    updateDistillation = async (modelObject: Distillation): Promise<Distillation> => {
        const doc = await this.db.get(modelObject._id);
        await this.db.remove(doc);
        return Distillation.fromSQLObject(await this.db.post(modelObject.toSQLObject()));
    }

    deleteDistillation = async (modelObject: Distillation): Promise<any> => {
        const doc = await this.db.get(modelObject._id);
        return await this.db.remove(doc);
    }
}