export interface Task {
    id?: string;
    title: string;
    description: string;
    isCompleted: boolean;
    categoryId: string;
    userId: string;
}