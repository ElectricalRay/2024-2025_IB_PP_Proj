type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
interface WeekTask {
    day: DaysOfWeek,
    taskDir: string,
    completed: boolean,
    addedToHome: boolean
}

interface DefaultTask {
    taskDir: string
}

interface DateTask {
    date: string,
    taskDir: string,
    addToHome: boolean
}

type Tasks = DateTask | WeekTask | DefaultTask;

export {WeekTask, DefaultTask, DateTask, Tasks, DaysOfWeek};