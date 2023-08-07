interface IUser {
    username: string;
    password: string;
};

interface ITodo {
    title: string;
    description: string;
    done: boolean;
    userId: string;
};

type JwtData = {
    id: string;
};