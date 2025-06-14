import {TaskStatus} from "../types";

export const statusOptions = [...Object.keys(TaskStatus).map((key) => ({
    label: key,
    value: TaskStatus[key as keyof typeof TaskStatus]
}))];
