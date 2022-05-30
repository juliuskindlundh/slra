export function isNull(value){
    if(value == null){
        return true;
    }
    return false;
}

export function doNothing(){
    return
}

export function isCategory(object){
    if(object !== null){
        if(object !== undefined){
            if(object.exerciseDTOs){
                return true
            }
        }
    }
    return false
}

export function reload(){
    window.location.reload();
}