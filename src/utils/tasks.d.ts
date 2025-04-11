type Fecha = `${number}-${number}-${number} ${number}:${number}:${number}`;

type Task = {
  title: string;
  description?: string | null;
  priority: number;
  status: number;
  expiration_date: Fecha;
};
