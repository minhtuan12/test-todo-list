export const TaskStatus = {
    Open: 0,
    Processing: 1,
    Done: 2,
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface ITodoItem {
    id: number;
    title: string;
    status: TaskStatusType;
}
