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
   tags: Array<string>;
}

export const DefaultExercise: Exercise = {
    id: "default exercise",
    name: "default exercise",
    desc: "exercise",
    uploads: ["default exercise"], 
    exerciseType: ExerciseType.failure,
    createdAt: "03-03-2022",   
    primaryUpload: "default exercise"
}

export const DefaultExerciseMapping: ExerciseMapping = {
    mappingId: "defaultexercisemappingId",
    exercise: DefaultExercise,
    sets: "5",
    quantity: "10",
    duration: "", 
}

 export const DefaultWorkout: Workout =  {
    id: "default",
    name: "default workout",
    desc: "default workout",
    workoutFocus: WorkoutFocus.strength, 
    exerciseMapping: [DefaultExerciseMapping, DefaultExerciseMapping, DefaultExerciseMapping, DefaultExerciseMapping],
    supersetMapping: { supersets: [[1,2], [3, 4]]},
    createdAt: "03-03-2022",
    uploads: ["default workout"],
    primaryUpload: "default workout",
    userId: "default workout",
    tags: ['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring']
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
}

export interface ProfilePermission {
    userId: string; 
    viewWorkouts: boolean; 
    viewExercises: boolean;
    viewProfile: boolean; 
    viewCheckins: boolean; 
}

export interface Comment  {
    commentText: string; 
    created: string;
    username: string; 
}

export const DefaultComment: Comment = {
    commentText: "Great place to hit legs!",
    created: "1649808000000", 
    username: "Jacob Stevens"
}

export interface Place {
    id: string;
    name: string; 
    desc: string;
    longitude: string; 
    latitude: string; 
    open: boolean; 
    placeType: string; 
    uploads: Array<string>;
    primaryUpload: string;
    comments: Array<Comment>; 
}

export const DefaultPlace = {
    id: "defaultplace",   
    name: "Gold's Gym", 
    desc: "Full feature fitness facility located in Vancouver Mall",
    longitude: "", 
    latitude: "",
    open: false,
    placeType: "Gym", 
    uploads: [""],
    primaryUpload: "",
    comments: [DefaultComment, DefaultComment, DefaultComment]
}

export interface Checkin { 
    timeEntered: string;
    place: Place; 
    timeLeft?: string; 
    workout: Workout; 
    username?: string;
}

export const ExampleCheckins: Array<Checkin> = [
    {
        workout: DefaultWorkout, 
        place: DefaultPlace, 
        timeEntered: "1649984400000", 
        timeLeft: "1649988000000"
    },
    {
        workout: DefaultWorkout, 
        place: DefaultPlace, 
        timeEntered: "1649898000000", 
        timeLeft: "1649901600000"
    },
    {
        workout: DefaultWorkout, 
        place: DefaultPlace, 
        timeEntered: "1649808000000", 
        timeLeft: "1649815200000"
    },
]


const global = {
    loggedInColor: "#34ebde",
    workoutFocuses: WorkoutFocus,
    datePrintLocaleOptions: { weekday: 'short', hour: 'numeric', hour12: true, minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' }

}
export default global;