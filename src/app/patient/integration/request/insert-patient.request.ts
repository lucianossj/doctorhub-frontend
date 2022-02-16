
export class InsertPatientRequest {
    constructor(
        public fullname: string,
        public birth: string,
        public address: string,
        public gender: string,
        public phone: string,
        public email: string
    ) {}
}