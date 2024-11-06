import { Image } from './image.model';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: string;
  image?: Image;
}
