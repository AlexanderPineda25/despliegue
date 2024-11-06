import { Image } from './image.model';
import { File } from './file.model';

export interface Book {
  id: number;
  title: string;
  author: string;
  publicationDate: string;  
  description: string;
  image?: Image;
  file?: File;
}
