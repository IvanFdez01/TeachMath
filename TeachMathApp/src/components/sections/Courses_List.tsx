import { course_col, COURSES, TeacherStudent } from '../../context/types';

type Props = {
    students: TeacherStudent[]
}

const Courses_List: React.FC<Props> = ({ students }) => {


    // TODO:
    // desbloquear contenido
    // mostrar contenido desbloqueado
    // opcion de eliminar curso (relacion teacher-student-curso)

    return (
        <div className="z-0 mt-6 flex flex-col gap-6 items-center">
            {students.map(s => (
                <div className={`relative w-[115%] p-4 rounded-xl bg-gray-50 border-4 border-${course_col[s.course]} shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden`}>
                    <div className={`absolute top-0 left-0 right-0 h-4 bg-${course_col[s.course]} shadow-md`}></div>
                    <div className="mt-6 space-y-3">
                        <h2 className="text-xl font-extrabold text-gray-900 tracking-wide">
                            {COURSES[s.course]}
                        </h2>
                        <p className="text-lg text-gray-700">
                            Student: <span className="font-semibold text-gray-900">{s.student}</span>
                        </p>
                    </div>
                    <div className={`pointer-events-none absolute top-[35%] right-4 w-12 h-12 rounded-full bg-${course_col[s.course]} opacity-20`}>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default Courses_List;

