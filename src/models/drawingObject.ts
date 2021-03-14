const drawingObjectTypes = ['line', 'rect', 'ellipse', 'qcurve', 'separator'] as const;

export type DrawingObjectID = string;
type DrawingObjectType = typeof drawingObjectTypes[number];
export interface DrawingObjectPoint {
  x: number;
  y: number;
}
type DrawingObjectState = 'in-progress' | 'done';
export interface DrawingObject {
  id: DrawingObjectID;
  points: DrawingObjectPoint[];
  state: DrawingObjectState;
  type: DrawingObjectType;
}
