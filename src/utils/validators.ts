export const Validators: {[key: string]: Function} = {
    required: (value: string) => value ? undefined : 'Ez a mező kötelező',
    length: (length: number) => (value: string) => value && value.length === length ? undefined : `Ennek a mezőnek ${length} betű hosszúságúnak kell lennie`
};