export type CacheEntry<T> = {
    createdAt: number,
    val: T
};

export class Cache{
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

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
    #reap(): void{
        const expirationTime = Date.now() - this.#interval;
        for(const[key,entry] of this.#cache){
            if(entry.createdAt<expirationTime){
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop():void{
        setInterval(this.#reap, this.#interval, this.#reapIntervalId);
    }
    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    }
    stopReapLoop():void{
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
