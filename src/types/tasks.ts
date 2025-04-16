export interface NewTask {
  title: string;
  description?: string;
  priority: number;
  status: number;
  expiration_time: string | Date;
  creation_time?: Date;
}

export interface UpdateTask {
  id: number;
  title: string;
  description?: string;
  priority: number;
  status: number;
  expiration_time: string | Date;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: string;
  priority_id: number;
  status_id: number;
  status: string;
  expiration_time: string | Date;
  creation_time?: string | Date;
}
