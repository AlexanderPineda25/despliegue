export interface Agenda {
  id: number;                
  teacher: {
    username: string;         
    email: string;           
  };
  student?: {
    username: string;         
    email: string;           
  };
  parentName: string;         
  contactInfo?: string;       
  meetingDate: string;        
  startTime: string;          
  endTime: string;           
  status: string;           
}
