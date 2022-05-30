import { CategoryEditor } from "./CategoryEditor";
import { ExerciseEditor } from "./ExerciseEditor";
import { ExerciseList } from "./ExerciseList";

function Exercises(){
    return (
        <div>
            <ExerciseEditor/>
            <CategoryEditor/>
            <ExerciseList/>
        </div>
    )
}

export default Exercises;