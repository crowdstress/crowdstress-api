import { DrawingObjectID, DrawingObjectPoint } from '@/models/drawingObject';
import { Section } from '@/models/section';

export interface Human {
  coords: DrawingObjectPoint;
  panic: number;
  passedExits: DrawingObjectID[];
  targetSection: Section | null;
}
