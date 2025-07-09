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

export const course_col = {
    "MATH":"blue-500",
    "PROG":"yellow-800",
    "PHY":"orange-500"
}

export type MyUser = {
    username: string,
    rol: ROL
}

export type TeacherStudent = {
    teacher: string,
    student: string,
    course: keyof typeof COURSES
}