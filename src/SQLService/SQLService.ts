import {Distillation} from '../models/Distillation/Distillation'
 
export class SQLService {
    dbName: string = 'Distillation';
    db: IDBDatabase;
    databaseOpenRequest: IDBOpenDBRequest;

    constructor(){
        this.databaseOpenRequest= window.indexedDB.open('DistilleryDatabase', 1);
        this.databaseOpenRequest.onsuccess = () => {
            console.log('Database initialized');
            if(!this.db.objectStoreNames.contains(this.dbName)){
                this.db.createObjectStore(this.dbName);
            }
            displayData();   
        }
        this.databaseOpenRequest.onerror = () => {
            console.log('Database failed to connect');
        }
        this.db = this.databaseOpenRequest.result;
    }

    findAll = async () => {
        return await this.db.find();
    }

    findAllByName = async (nameToFind: string): Promise<Distillation[]> => {
        return Distillation.fromSQLObjects(await this.db.find({ name: nameToFind}));
    }
    findAllByTaxID = async (taxIDToFind: string): Promise<Distillation[]> => {
        return Distillation.fromSQLObjects(await this.db.find({taxID: taxIDToFind}));
    }

    sumAllHLFByName = async (nameToFind: string): Promise<number> => {
        const dist: any[] = await this.db.find({name: nameToFind});
        return dist.reduce((accumulator, item: any) => accumulator + item.HLF, 0);
    }

    sumAllHLFByTaxID = async (taxIDToFind: string): Promise<number> => {
        const dist: any[] = await this.db.find({taxID: taxIDToFind});
        return dist.reduce((accumulator, item: any) => accumulator + item.HLF, 0);
    }

    sumAllWeightByName = async (nameToFind: string): Promise<number> => {
        const dist: any[] = await this.db.find({name: nameToFind});
        return dist.reduce((accumulator, item: any) => accumulator + item.weightInKilograms, 0);
    }

    sumAllWeightByTaxID = async (taxIDToFind: string): Promise<number> => {
        const dist: any[] = await this.db.find({taxID: taxIDToFind});
        return dist.reduce((accumulator, item: any) => accumulator + item.weightInKilograms, 0);
    }

    createNewDistillation = async (modelObject: Distillation): Promise<Distillation> => {
        await this.db.insert(modelObject);
        return Distillation.fromSQLObject(await this.db.find(modelObject._id));
    }

    updateDistillation = async (modelObject: Distillation): Promise<Distillation> => {
        const id = modelObject._id;
        delete modelObject._id;
        await this.db.update(id, modelObject);
        return Distillation.fromSQLObject(await this.db.find(modelObject._id));
    }

    deleteDistillation = async (modelObject: Distillation): Promise<any> => {
        return await this.db.remove({_id: modelObject._id});
    }
}