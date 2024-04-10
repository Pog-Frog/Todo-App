interface User {
    email: string;
    name: string;
    password: string;
}

interface AuthenticatedUser {
    email: string;
    name: string;
}

interface category {
    name: string;
    id: string;
    icon: string;
    color: string;
    isEditable: boolean;
}

interface task {
    title: string;
    description: string;
    isCompleted: boolean;
    categoryId: string;
}