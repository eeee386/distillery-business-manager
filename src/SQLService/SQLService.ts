import {Distillation} from '../models/Distillation/Distillation'
 
export class SQLService {

    db: IDBDatabase | null = null;

    createDB = async () => {
        let request = window.indexedDB.open('Distillation');
        try {
            let db: IDBDatabase = await new Promise((resolve, reject) => {
              request.onsuccess = function (event: any) {
                return event.target.result;
              }
              request.onerror = reject
              request.onupgradeneeded = function(event: any) { 
                let db = event.target.result;
                db.createObjectStore("Distillation", { autoIncrement : true });
                return db;
              };
            })
            this.db = db;
          } catch(err) {
            console.log('error', err);
        }
    }

    findAll = async () => {
        const tx = this.db?.transaction('Distillation');
        const os = tx?.objectStore('Distillation');
        let request = os?.getAll();
        try {
            await new Promise((resolve, reject) => {
                if(request){
                    request.onsuccess = function () {
                        return request?.result;
                    }
                    request.onerror = reject
                }
            });
        } catch(err) {
            console.log('error', err);
        }
    };

    findAllByName = async (nameToFind: string): Promise<Distillation[]> => {
        const {docs} = await this.db.find({selector: { name: nameToFind}});
        return Distillation.fromObjects(docs);
    };
    findAllByTaxID = async (taxIDToFind: string): Promise<Distillation[]> => {
        const {docs} = await this.db.find({selector: { taxID: taxIDToFind}});
        return Distillation.fromObjects(docs);
    };

    sumAllHLFByName = async (nameToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { name: nameToFind}});
        return res.docs.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.HLF, 0)
    };

    sumAllHLFByTaxID = async (taxIDToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { taxID: taxIDToFind }});
        return res.docs.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.HLF, 0)
    };

    sumAllWeightByName = async (nameToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { name: nameToFind}});
        return res.docs.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.weightInKilograms, 0)
    };

    sumAllWeightByTaxID = async (taxIDToFind: string): Promise<number> => {
        const res = await this.db.find({selector: { taxID: taxIDToFind }});
        return res.docs.reduce((acc: number, curr: {[key: string]: any}) => acc + curr.weightInKilograms, 0);
    };

    createNewDistillation = async (modelObject: {[key: string]: any}): Promise<Distillation> => {
        const result = await this.db.post(modelObject);
        const found = await this.db.get(result.id);
        return Distillation.fromObject(found);
    };

    bulkAddDistillations = async (modelObjects: Array<{[key: string]: any}>): Promise<Distillation[]> => {
        console.log('this is called');
        const res = await this.db.bulkDocs(modelObjects);
        console.log(res);
        return this.findAll();
    }

    updateDistillation = async (modelObject: {[key: string]: any}): Promise<Distillation> => {
        const result = await this.db.put(modelObject);
        const found = await this.db.get(result.id);
        return Distillation.fromObject(found);
    };

    deleteDistillation = async (modelObject: Distillation): Promise<any> => {
        const doc = await this.db.get(modelObject._id);
        return await this.db.remove(doc);
    };
}