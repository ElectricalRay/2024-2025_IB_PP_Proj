type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
interface WeekTask {
    day: DaysOfWeek,
    taskDir: string,
    completed: boolean,
    addedoHome: boolean
}

interface DefaultTask {
    taskDir: string
}

interface DateTask {
    date: Date,
    taskDir: string
}

type Tasks = DateTask | WeekTask | DefaultTask;

export {WeekTask, DefaultTask, DateTask, Tasks, DaysOfWeek};