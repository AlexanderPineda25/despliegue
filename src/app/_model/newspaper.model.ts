import { Image } from './image.model';
import { File } from './file.model';

export interface Newspaper{
  id: number;
  title: string;
  description: string;
  publicationDate: string;  
  image?: Image;
  file?: File;
}
