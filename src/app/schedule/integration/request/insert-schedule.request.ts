
export class InsertScheduleRequest {
    constructor(
        public date: string,
        public hour: string,
        public status: number,
        public specialty: number,
        public doctor: number,
        public patient: number
    ) {}
}