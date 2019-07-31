import {Distillation} from '../models/Distillation/Distillation'
import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
 
export class SQLService {

    db: any;

    constructor(){
        PouchDB.plugin(find);
        this.db = new PouchDB('Distillation');
    }


    createIndex = async () => {
        return await this.db.createIndex({
            index: {fields: ['name', 'taxID']}
        });
    }

    findAll = async () => {
        const res = await this.db.find({selector: {}});
        return Distillation.fromSQLObjects(res.docs);
    }

    findAllByName = async (nameToFind: string): Promise<Distillation[]> => {
        const {docs} = await this.db.find({selector: { name: nameToFind}});
        return Distillation.fromSQLObjects(docs);
    }
    findAllByTaxID = async (taxIDToFind: string): Promise<Distillation[]> => {
        const {docs} = await this.db.find({selector: { taxID: taxIDToFind}});
        return Distillation.fromSQLObjects(docs);
    }

    sumAllHLFByName = async (nameToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { name: nameToFind}});
        return res.docs.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.HLF, 0)
    }

    sumAllHLFByTaxID = async (taxIDToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { taxID: taxIDToFind }});
        return res.docs.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.HLF, 0)
    }

    sumAllWeightByName = async (nameToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { name: nameToFind}});
        return res.docs.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.weightInKilograms, 0)
    }

    sumAllWeightByTaxID = async (taxIDToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { taxID: taxIDToFind }});
        return res.docs.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.weightInKilograms, 0);
    }

    createNewDistillation = async (modelObject: {[key: string]: any}): Promise<Distillation> => {
        const result = await this.db.post(modelObject);
        return await this.db.get(result.id)
    }

    updateDistillation = async (modelObject: Distillation): Promise<Distillation> => {
        return Distillation.fromSQLObject(await this.db.put(modelObject.toSQLObject()));
    }

    deleteDistillation = async (modelObject: Distillation): Promise<any> => {
        const doc = await this.db.get(modelObject._id);
        return await this.db.remove(doc);
    }

    destroyDataBase = async (): Promise<any> => {
        await this.db.destroy('Distillation')
    }
}