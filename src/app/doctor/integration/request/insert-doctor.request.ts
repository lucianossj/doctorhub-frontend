
export class InsertDoctorRequest {
    constructor(
        public fullname: string,
        public username: string,
        public password: string,
        public specialty: number
    ) {}
}