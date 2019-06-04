declare interface Array<T> {
    a$Map<R>(cb: (it: T, index?: number, arr?: T[]) => Promise<R>): Promise<R[]>

    a$ForEach(cb: (it: T, index?: number, arr?: T[]) => Promise<any>): Promise<void>

    a$Each(cb: (it: T, index?: number, arr?: T[]) => Promise<any>): Promise<void>
}

declare interface Promise<T> {
    a$Map<R>(cb: (it: T, index?: number, arr?: T[]) => Promise<R>): Promise<R[]>
}

type IterableCallback<T, R> = (it: T, index?: number, arr?: T[]) => Promise<R>

Array.prototype.a$Map = function <R, T>(this: T[], cb: IterableCallback<T, R>): Promise<R[]> {
    return Promise.all(this.map(cb));
};

Array.prototype.a$ForEach = function <T>(this: T[], cb: IterableCallback<T, any>): Promise<void> {
    return Promise.all(this.map(cb)).then(() => void (0));
};

Array.prototype.a$Each = function <T>(this: T[], cb: IterableCallback<T, any>): Promise<void> {
    return this.a$ForEach(cb);
};

Promise.prototype.a$Map = function <R, T>(this: Promise<T[]>, cb: IterableCallback<T, R>): Promise<R[]> {
    return this.then(arr => Promise.all(arr.map(cb)));
};
