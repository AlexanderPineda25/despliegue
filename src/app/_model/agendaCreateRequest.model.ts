export interface AgendaCreateRequest {
  teacherId: number | null; 
  studentId: number | null;
  parentName: string;
  contactInfo?: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
}
