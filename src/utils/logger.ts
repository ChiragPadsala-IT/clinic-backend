export const logger = {
    info : (...args: any[]) => console.log("[INFO]", ...args),
    error : (...args: any[]) => console.log("[ERROR]", ...args),
    debug : (...args: any[]) => console.log("[DEBUG]", ...args),
}
