import { DrawingObject } from '@/models/drawingObject';
import { Human } from '@/models/human';

export interface ProjectData {
  humans: Human[];
  objects: DrawingObject[];
}

export interface Project {
  data: ProjectData;
  id: number;
  name: string;
  owner: number;
  updatedAt: Date;
}
