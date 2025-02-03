export type TProxy<T> = {

    [P in keyof T]: T[P];

};
