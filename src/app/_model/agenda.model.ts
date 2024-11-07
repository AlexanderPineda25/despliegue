export interface Agenda {
    id?: number;
    teacherId: number;
    studentId?: number;
    parentName: string;
    contactInfo?: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    status?: string;
  }
  