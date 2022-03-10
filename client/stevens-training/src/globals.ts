export enum WorkoutFocus {
    strength = "Strength", 
    power = "Power", 
    cardio = "Cardio", 
    mix = "Mix", 
    flexibility = "Flexibility",
    other = "Other",
    bodybuilding= "Bodybuilding",
    metabolic ="Metabolic",
    stability = "Stability"
}

export enum ExerciseType {
    stretching = "Stretching", 
    calisthenic = "Calisthenic",
    plyometric = "Plyometric",
    intervals = "Intervals", 
    failure = "Failure",
    dropsets = "Drop Sets",
    heavy = "Heavy",
    pump = "Pump",
    control = "Control",
    speed = "Speed",
    explosive = "Explosive",
    max = "Max",
    endurance = "Endurance",
    anaerobic = "Anaerobic"
}

export interface Workout {
   id: string
   name: string;
   desc: string;
   workoutFocus: WorkoutFocus; 
   exerciseMapping: Array<ExerciseMapping>;
   supersetMapping: { supersets: Array<any> }
   createdAt: string;
   uploads: Array<string>;
   primaryUpload: string;
   userId: string;
}

 export const DefaultWorkout: Workout =  {
    id: "default workout",
    name: "default workout",
    desc: "default workout",
    workoutFocus: WorkoutFocus.strength, 
    exerciseMapping: [],
    supersetMapping: { supersets: [] },
    createdAt: "03-03-2022",
    uploads: ["default workout"],
    primaryUpload: "default workout",
    userId: "default workout"
}

export interface Exercise {
    id: string; 
    name: string; 
    desc: string; 
    uploads: any; 
    exerciseType: ExerciseType;
    createdAt: string;
    primaryUpload: string;
}

export interface ExerciseMapping {
    mappingId: string; 
    exercise: Exercise; 
    sets: string;
    quantity: string; 
    duration: string; 
    order: number; 
}

export interface ProfilePermission {
    userId: string; 
    viewWorkouts: boolean; 
    viewExercises: boolean;
    viewProfile: boolean; 
    viewCheckins: boolean; 
}

const global = {
    loggedInColor: "#34ebde",
    workoutFocuses: WorkoutFocus
}
export default global;