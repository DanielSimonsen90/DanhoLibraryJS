import { Properties, properties } from "./properties";

declare global {
  interface ObjectConstructor {
    properties: Properties;
  }
}



Object.properties = properties;