import React, { useContext,useState } from "react";

const UserContext = React.createContext();
export function useUserContext(){
    return useContext(UserContext)
}

const ExerciseContext = React.createContext();
export function useExerciseContext(){
    return useContext(ExerciseContext);
}

const CategoryContext = React.createContext();
export function useCategoryContext(){
    return useContext(CategoryContext);
}

const InputFieldContext = React.createContext();
export function useInputFieldContext(){
    return useContext(InputFieldContext);
}

const SelectedContext = React.createContext();
export function useSelectedContext(){
    return useContext(SelectedContext);
}

export function ContextProvider({children}){
    //User
    const [user,setUser] = useState(); 

    //Exercises
    const [exercises,setExercises] = useState([]);

    //Categorys
    const [categorys,setCategorys] = useState([]);
    
    //InputFields
    const [inputFields,setInputFields] = useState([]);

    const [selected,setSelected] = useState();

    return(
        <UserContext.Provider value={{user,setUser}}>
            <ExerciseContext.Provider value={{exercises,setExercises}}>
                <CategoryContext.Provider value={{categorys,setCategorys}}>
                    <InputFieldContext.Provider value={{inputFields,setInputFields}}>
                        <SelectedContext.Provider value={{selected,setSelected}}>
                            {children}
                        </SelectedContext.Provider>
                    </InputFieldContext.Provider>
                </CategoryContext.Provider>
            </ExerciseContext.Provider>
        </UserContext.Provider>
    );
}