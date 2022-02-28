# [DanhoLibraryJS](../README.md)

## Classes

### Events

```ts
/**
 * Base event for @see EventEmitter
 * @borrows EventHandler 
 * @borrows BaseEvent
 */
class Event<
    Event extends BaseEvent<string, Array<any>>,
    Name extends keyof Events = keyof Events
> {
    /**
     * Base event for @see EventEmitter, @borrows EventHandler
     * @param name Name of event
     * @param listeners Listeners/Handlers to execute when emitted
     */
    constructor(name: Name, ...listeners: Array<EventHandler<Events, Name>>);

    /**Name of event*/
    public name: Name;
    /**Listener limit - default: 0 */
    public limit = 0;
    /**Number of times event was emitted - default: 0*/
    public get runs: number;
    /**Timestamp of last emit - default: null*/
    public get lastEmitted: Date;

    /**
     * Emits event and returns array of responses
     * @param args Arguments required for event listeners
     * @returns Return values of listeners' returns
     */
    public emit(...args: Events[Name]): any[];
    /**
     * Adds listener to listeners array and returns self with new listener added
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public on(listener: EventHandler<Events, Name>, prepend = false): this
    /**
     * Like Event#on, adds listener to listeners array and returns self with new listener added, however removes listener once emitted
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public once(listener: EventHandler<Events, Name>, prepend = false): this;
    /**
     * Returns true or false, depending if event includes listener
     * @param listener Listener to test
     * @returns True of false, depending if event includes listener
     */
    public includes(listener: EventHandler<Events, Name>): boolean;
    /**
     * Removes listener from internal listeners array
     * @param listener Listener to remove. If none specified, all will be removed
     * @param throwNotFoundError Throw error if listener isn't in listeners array - default: false
     * @returns this, without listener
     * 
     * @throws NotFound, if throwNotFoundError is true, and internal listeners array doesn't include listener provided
     */
    public off(listener?: EventHandler<Events, Name>, throwNotFoundError = false): this;
}

/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 * @borrows Event
 * @borrows BaseEvent
 */
class EventCollection<Events extends BaseEvent<string, Array<any>>> {
    /**Events to add in construction - Map<eventName, eventHandlers>*/
    constructor(events?: Map<keyof Events, EventHandler<Events>>);
    
    /**Amount of events stored*/
    public get size: number

    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    public has<EventName extends keyof Events>(event: EventName): boolean
    /**
     * Returns all event handlers for event name. T is return type for event
     * @param event Event name
     * @returns Event object stored
     */
    public get<EventName extends keyof Events>(event: EventName): Event<Events, EventName> 
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @param once Whether or not handler only should run once or all times
     * @returns this
     */
    public add<EventName extends keyof Events>(name: EventName, handler: EventHandler<Events, keyof Events>, once = false): this
    /**
     * @summary clear(): Clears all events
     * @summary clear("all", myEventHandler): Removes myEventHandler from all events that have it
     * @summary clear("myEvent"): Clears all handlers tied to "myEvent"
     * @summary clear("myEvent", myEventHandler): Removes myEventHandler from "myEvent"
     * 
     * @param name Event name | "all"
     * @param handler Specific handler to remove. If left blank, all handlers in name will be removed
     * @returns this
     */
    public clear<EventName extends keyof Events>(name: EventName | 'all' = 'all', handler?: EventHandler): this
    /**
     * Emits event matching name, and provides args param to saved handers. Returns result from all handlers
     * @param name Event name
     * @param args Arguments for event handlers
     * @returns Result from all handlers
     */
    public emit<Event extends keyof Events>(name: Event, ...args: Events[Event]): any[];
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     * 
     * @throws Unknown event, if event name isn't recognized
     */
    public limit<Event extends keyof Events>(eventName: 'all' | Event, limit: number): this
}

/**
 * Traditional Node.js EventEmitter for vanilla JavaScript
 * @borrows EventCollection
 * @borrows BaseEvent
 * @borrows EventHandler
 */
class EventEmitter<Events extends BaseEvent<string, Array<any>>> {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<keyof Events, EventHandler<Events>>);

    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    on<Return extends any, Event extends keyof Events>(event: Event, listener: EventHandler<Events, Event, Return>): this;
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    once<Return extends any, Event extends keyof Events>(event: Event, listener: EventHandler<Events, Event, Return>): this;
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    off<Return extends any, Event extends keyof Events>(event: Event | 'all' = 'all', listener?: EventHandler<Events, Event, Return>): this;
    /**
     * Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @fires event
     * @returns Array of listeners' reponses
     */
    emit<Return extends any, Event extends keyof Events>(event: Event, ...args: Events[Event]): Array<Return>;
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param event: Specific event to limit, or by default, 'all'
     * @param limit Limit of events to keep. If you want to limit amount of events saved, use 'all'.
     * @returns this with the new limit
     */
    public limit<Event extends keyof Events>(event: 'all' | Event, limit: number): this;
}

```

### Time

```ts
class DanhoDate {
    constructor(data: Constructor)

    protected _date: Date;

    /**
     * Year of the date
     */
    public year: number

    /**
     * Month of the date
     */
    public month: number

    /**
     * Days in the month of the date
     */
    public daysInMonth: number

    /**
     * Week of the year the day is in
     */
    public week: number

    /**
     * Week of the month the day is in
     */
    public weekOfMonth: number

    /**
     * Day of the date
     */
    public day: number

    /**
     * Hours of the date
     */
    public hours: number
    
    /**
     * Minutes of the date
     */
    public minutes: number
    
    /**
     * Seconds of the date
     */
    public seconds: number
    
    /**
     * Milliseconds of the date
     */
    public milliseconds: number

    /**
     * Week day i.e. Monday
     */
    public get weekDay: LongDay
    
    /**
     * Short week day i.e. Mon
     */
    public get weekDayShort: ShortDay
    
    /**
     * Month name i.e. February
     */
    public get monthName: LongMonth

    /**
     * Short month name i.e. Feb
     */
    public get monthNameShort: ShortMonth

    /**
     * Sets internal date property
     * @param data Time properties to set - replacement of i.e. Date.setHours(value: number): number
     * @returns This, with updated properties
     */
    public set(data: Partial<Data>): this

    /**
     * Calculates the time between this date and provided date
     * @returns TimeSpan between dates
     */
    public between(date: DanhoDate | Constructor): TimeSpan

    /**
     * String representation of Date. Use internal comment for formatting
     */
    public toString(format = "$dd/$MM/$year", relativeFormat?: TimeSpanFormat): string
}

/**
 * Time utility class
 * @borrows TimeDelay
 * @borrows ms
 */
class Time {
    /**
     * Returns array of amount of days in the months. 0 indexed
     */
    public static get daysInMonth: Array<number>

    /*
     * Millisecond in milliseconds (I know that sounds silly but it makes sense later on?)
     */
    public static get millisecond: number;
    /*
     * Second in milliseconds
     */
    public static get second: number;
    /*
     * Minute in milliseconds
     */
    public static get minute: number;
    /*
     * Hour in milliseconds
     */
    public static get hour: number;
    /*
     * Day in milliseconds
     */
    public static get day: number;
    /*
     * Week in milliseconds
     */
    public static get week: number;
    /*
     * Month in milliseconds
     */
    public static get month: number;
    /*
     * Year in milliseconds
     */
    public static get year: number;
    /*
     * Average month in milliseconds
     */
    public static get avgMonth: number;

    /*
     * Converts TimeDelay input into milliseconds
     */
    public static ms(input: TimeDelay): number
}

/**
 * Timespan between 2 dates.
 * @borrows TimeSpanValue
 * @borrows Time
 * @borrows TimeProperties
 */
class TimeSpan implements TimeProperties<true> {
    constructor(from: TimeSpanValue, to: TimeSpanValue = Date.now());

    /*
     * Total x between dates
     */
    public years: number;
    /*
     * Total x between dates
     */
    public months: number;
    /*
     * Total x between dates
     */
    public weeks: number;
    /*
     * Total x between dates
     */
    public days: number;
    /*
     * Total x between dates
     */
    public hours: number;
    /*
     * Total x between dates
     */
    public minutes: number;
    /*
     * Total x between dates
     */
    public seconds: number;
    /*
     * Total x between dates
     */
    public milliseconds: number;

    /**
     * Get the maximum amount of months between the two dates
     * @returns Number of max amount of months that are between the two dates
     */
    public getTotalMonths(): number;
    /**
     * Get the maximum amount of weeks between the two dates
     * @returns Number of max amount of weeks that are between the two dates
     */
    public getTotalWeeks(): number;
    /**
     * Get the maximum amount of days between the two dates
     * @returns Number of max amount of days that are between the two dates
     */
    public getTotalDays(): number;
    /**
     * Get the maximum amount of hours between the two dates
     * @returns Number of max amount of hours that are between the two dates
     */
    public getTotalHours(): number;
    /**
     * Get the maximum amount of minutes between the two dates
     * @returns Number of max amount of minutes that are between the two dates
     */
    public getTotalMinutes(): number;
    /**
     * Get the maximum amount of seconds between the two dates
     * @returns Number of max amount of seconds that are between the two dates
     */
    public getTotalSeconds(): number;
    /**
     * Get the maximum amount of milliseconds between the two dates
     * @returns Number of max amount of milliseconds that are between the two dates
     */
    public getTotalMilliseconds(): number;
    
    /**
     * Start date of timespan
     */
    public from: Date;
    /**
     * End date of timespan
     */
    public to: Date;
    /**
     * Timespan is in the past
     */
    public pastTense: boolean;

    public toString(includeMs: boolean = false): string
}
```
