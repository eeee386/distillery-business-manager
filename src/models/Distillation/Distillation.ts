export class Distillation {
    _id: string;
    date: Date;
    name: string;
    address: string;
    taxID: string;
    originID: string;
    HLF: number;
    weightInKilograms: number;
    _rev: string;

	constructor(
        date: Date,
        name: string,
        address: string,
        taxID: string,
        originID: string,
        HLF: number,
        weightInKilograms: number,
        _id: string,
        _rev: string,
        ) {
            this._id = _id;
            this.date = date;
            this.name = name;
            this.address = address;
            this.taxID = taxID;
            this.originID = originID;
            this.HLF = HLF;
            this.weightInKilograms = weightInKilograms;
            this._rev = _rev;
    }
    
    toObject(): {[key: string]: any} {
        return Object.assign({}, this);
    }

    static fromObject(modelObject: {[key: string]: any}): Distillation {
        const {_id, date, address, name, taxID, originID, HLF, weightInKilograms, _rev} = modelObject;
        return new Distillation(date, name, address, taxID, originID, HLF, weightInKilograms, _id, _rev);
    }

    static fromObjects(modelObjects: any[]): Distillation[] {
        const models: any[] = modelObjects
        return models.map((item: any) => {
            return Distillation.fromObject(item);
        });
    }
}