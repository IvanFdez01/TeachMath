export enum OPS {
    NONE, TASKS, ACCOUNT, THEORY, STUDENTS
}

export enum ROL {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT"
}

export enum COURSES {
  MATH = "Mathematics",
  PROG = "Programming",
  PHY = "Physics"
}

export type MyUser = {
    username: string,
    rol: ROL
}