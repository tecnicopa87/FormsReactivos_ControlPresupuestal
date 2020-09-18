export class Evento {
  fechaInicio: Date;
  fechaFin: Date;
  duracion: Date;//luego dar formato .getHours
  nombreevento: string;
  noAsistentes: number;
  productospromocionar: Array<string>;
  idmedicos: Array<number>;
  responsable: string;
  presupuesto: number;
  lugarevento: string;

}
