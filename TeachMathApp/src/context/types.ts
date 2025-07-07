export enum OPS {
    NONE, TASKS, ACCOUNT, THEORY, STUDENTS
}

export enum ROL {
  NONE = "NONE",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT"
}

export type MyUser = {
    username: string,
    rol: ROL
}