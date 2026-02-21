import { Properties } from "./properties";
declare global {
    interface ObjectConstructor {
        properties: Properties;
    }
}
