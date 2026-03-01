declare global {
    interface String {
        truncate(length: number, ellipsis?: string): string;
    }
}
export declare function truncate(this: string, length: number, ellipsis?: string): string;
