export type CacheEntry<T> = {
    createdAt: number,
    val: T
};

export class Cache{
    #cache = new Map<string, CacheEntry<any>>();
    add<T>(key: string, val: T): void{
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val,
        };
        this.#cache.set(key,entry);
    }
    get<T>(key: string): CacheEntry<T>| undefined {
        const entry= this.#cache.set(key);
        if(!entry) return undefined;
        return entry as CacheEntry<T>;
    }
}
