export class PatientModel {
    constructor(
        public code: number,
        public fullname: string,
        public birth: string,
        public address: string,
        public gender: string,
        public phone: string,
        public email: string
    ) {}
}
