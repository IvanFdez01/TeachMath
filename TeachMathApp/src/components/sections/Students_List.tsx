import { course_col, COURSES, TeacherStudent } from '../../context/types';

type Props = {
    students:TeacherStudent[] 
}

const Students_List: React.FC<Props> = ({students}) => {
 
    return (
      <div className = "mt-4 flex flex-col gap-2">
        {students.map(s => (
            <div className = {`bg-white rounded border-4 border-${course_col[s.course]}`}>
                border-{course_col[s.course]} in {COURSES[s.course]}
            </div>
        ))}
      </div>
    );
};

export default Students_List;

