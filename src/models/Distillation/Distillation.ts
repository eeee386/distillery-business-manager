export class Distillation {
    _id?: string;
    date: Date;
    name: string;
    address: string;
    taxID: string;
    originID: string;
    HLF: number;
    weightInKilograms: number;


	constructor(
        date: Date,
        name: string,
        address: string,
        taxID: string,
        originID: string,
        HLF: number,
        weightInKilograms: number,
        _id?: string,
        ) {
            this._id = _id;
            this.date = date;
            this.name = name;
            this.address = address;
            this.taxID = taxID;
            this.originID = originID;
            this.HLF = HLF;
            this.weightInKilograms = weightInKilograms;
    }
    
    toSQLObject(): string {
        return JSON.stringify(Object.assign({}, this));
    }

    static fromSQLObject(modelObject: string): Distillation {
        const {_id, date, address, name, taxID, originID, HLF, weightInKilograms} = JSON.parse(modelObject)
        return new Distillation(date, name, address, taxID, originID, HLF, weightInKilograms, _id)
    }

    static fromSQLObjects(modelObjects: string): Distillation[] {
        const models: any[] = JSON.parse(modelObjects);
        return models.map((item: any) => {
            const {_id, date, address, name, taxID, originID, HLF, weightInKilograms} = item;
            return new Distillation(date, name, address, taxID, originID, HLF, weightInKilograms, _id)
        })
    }
}