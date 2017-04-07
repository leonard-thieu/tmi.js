declare module 'tmi.js' {
    import {EventEmitter} from 'events';
    import {Options, RequestCallback} from 'request';
    import * as WebSocket from 'ws';

    interface LoggingFunction {
        (message: string): void;
    }

    export interface ClientOptions {
        options?: {
            clientId?: string | null;
            debug?: boolean;
        };

        connection?: {
            server?: string;
            port?: number;
            reconnect?: boolean;
            maxReconnectAttempts?: number;
            maxReconnectInterval?: number;
            reconnectDecay?: number;
            reconnectInterval?: number;
            secure?: boolean;
            timeout?: number;
        }

        identity?: {
            username: string;
            password: string;
        }

        channels?: string[];

        logger?: {
            info: LoggingFunction;
            warn: LoggingFunction;
            error: LoggingFunction;
        };
    }

    export class client extends EventEmitter {
        constructor(opts?: ClientOptions);

        // region API

        api(options: Options, callback: RequestCallback): void;

        // endregion

        // region Functions

        getChannels(): string[];

        getOptions(): ClientOptions;

        getUsername(): string;

        isMod(channel: string, username: string): boolean;

        readyState(): string;

        // endregion

        // region Events

        on(event: 'action', listener: (channel: string, userstate: Twitch.UserState, message: string, self: boolean) => void): this;
        on(event: 'ban', listener: (channel: string, username: string, reason: string | null) => void): this;
        on(event: 'chat', listener: (channel: string, userstate: Twitch.UserState, message: string, self: boolean) => void): this;
        on(event: 'cheer', listener: (channel: string, userstate: Twitch.UserState, message: string) => void): this;
        on(event: 'clearchat', listener: (channel: string) => void): this;
        on(event: 'connected', listener: (address: string, port: number) => void): this;
        on(event: 'connecting', listener: (address: string, port: number) => void): this;
        on(event: 'disconected', listener: (reason: string) => void): this;
        on(event: 'emoteonly', listener: (channel: string, enabled: boolean) => void): this;
        // obj undocumented
        on(event: 'emotesets', listener: (sets: string, obj: Twitch.EmoteSets) => void): this;
        // added
        on(event: 'globaluserstate', listener: (userstate: Twitch.GlobalUserState) => void): this;
        on(event: 'hosted', listener: (channel: string, username: string, viewers: number) => void): this;
        on(event: 'hosting', listener: (channel: string, target: string, viewers: number) => void): this;
        on(event: 'join', listener: (channel: string, username: string, self: boolean) => void): this;
        on(event: 'logon', listener: () => void): this;
        on(event: 'message', listener: (channel: string, userstate: Twitch.UserState, message: string, self: boolean) => void): this;
        on(event: 'mod', listener: (channel: string, username: string) => void): this;
        on(event: 'mods', listener: (channel: string, mods: string[]) => void): this;
        on(event: 'names', listener: (channel: string, users: string[]) => void): this;
        on(event: 'notice', listener: (channel: string, msgid: string, message: string) => void): this;
        on(event: 'part', listener: (channel: string, username: string, self: boolean) => void): this;
        on(event: 'ping', listener: () => void): this;
        on(event: 'pong', listener: (latency: number) => void): this;
        on(event: 'r9kbeta', listener: (channel: string, enabled: boolean) => void): this;
        on(event: 'reconnect', listener: () => void): this;
        // modified
        on(event: 'resub', listener: (channel: string, systemMsg: string) => void): this;
        on(event: 'roomstate', listener: (channel: string, state: Twitch.RoomState) => void): this;
        on(event: 'serverchange', listener: (channel: string) => void): this;
        on(event: 'slowmode', listener: (channel: string, enabled: boolean, length: number) => void): this;
        on(event: 'subscribers', listener: (channel: string, enabled: boolean) => void): this;
        // method undocumented
        on(event: 'subscription', listener: (channel: string, username: string, method: object) => void): this;
        on(event: 'timeout', listener: (channel: string, username: string, reason: string | null, duration: number) => void): this;
        on(event: 'unhost', listener: (channel: string, viewers: number) => void): this;
        on(event: 'unmod', listener: (channel: string, username: string) => void): this;
        on(event: 'whisper', listener: (from: string, userstate: Twitch.WhisperUserState, message: string, self: boolean) => void): this;
        on(event: string | symbol, listener: Function): this;

        // endregion

        // region Commands

        action(channel: string, message: string): Promise<[string]>;

        ban(channel: string, username: string, reason?: string): Promise<[string, string, string | undefined]>;

        clear(channel: string): Promise<[string]>;

        color(color: string): Promise<[string]>;

        commercial(channel: string, seconds: number): Promise<[string, number]>;

        connect(): Promise<[string, number]>;

        disconnect(): Promise<[string, number]>;

        emoteonly(channel: string): Promise<[string]>;

        emoteonlyoff(channel: string): Promise<[string]>;

        host(channel: string, target: string): Promise<[string, string]>;

        join(channel: string): Promise<[string]>;

        mod(channel: string, username: string): Promise<[string, string]>;

        mods(channel: string): Promise<[string]>;

        part(channel: string): Promise<[string]>;

        ping(): Promise<[number]>;

        r9kbeta(channel: string): Promise<[string]>;

        r9kbetaoff(channel: string): Promise<[string]>;

        raw(message: string): Promise<[string]>;

        say(channel: string, message: string): Promise<[string]>;

        slow(channel: string, length?: number): Promise<[string]>;

        slowoff(channel: string): Promise<[string]>;

        subscribers(channel: string): Promise<[string]>;

        subscribersoff(channel: string): Promise<[string]>;

        timeout(channel: string, username: string, length?: number, reason?: string): Promise<[string, string, number | undefined, string | undefined]>;

        unban(channel: string, username: string): Promise<[string, string]>;

        unhost(channel: string): Promise<[string]>;

        unmod(channel: string, username: string): Promise<[string, string]>;

        whisper(username: string, message: string): Promise<[string, string]>;

        // endregion

        // region Undocumented

        emotesets: Twitch.EmoteSets;
        globaluserstate: Twitch.GlobalUserState;
        ws: WebSocket;

        // endregion
    }
}

declare namespace Twitch {
    interface EmoteSets {
        [id: string]: EmoteSet[];
    }

    interface EmoteSet {
        id: number;
        code: string;
    }

    interface GlobalUserState {
        'badges': { [setName: string]: string } | null;
        'badges-raw': string | null;
        'color': string | null;
        'display-name': string;
        'emote-sets': number[];
        'user-id': string;
        'user-type': 'empty' | 'mod' | 'global_mod' | 'admin' | 'staff' | null;
    }

    interface UserState {
        'badges': { [setName: string]: string } | null;
        'badges-raw': string | null;
        'bits'?: number;
        'color': string | null;
        'display-name': string;
        'emotes': { [id: string]: string[] } | null;
        'emotes-raw': string | null;
        'historical'?: boolean;
        'id': string;
        'login'?: string;
        'message-type': string;
        'msg-id'?: string;
        'msg-param-months'?: string;
        'mod': boolean;
        'room-id': string;
        'sent-ts'?: string;
        'subscriber': boolean;
        'system-msg'?: string;
        'tmi-sent-ts': string;
        'turbo': boolean;
        'user-id': string;
        'user-type': string | null;
        'username'?: string;
    }

    interface WhisperUserState {
        'badges': { [setName: string]: string } | null;
        'badges-raw': string | null;
        'color': string | null;
        'display-name': string;
        'emotes': { [id: string]: string[] } | null;
        'emotes-raw': string | null;
        'message-id': string;
        'message-type': string;
        'thread-id': string;
        'turbo': boolean;
        'user-id': string;
        'user-type': null;
        'username': string;
    }

    interface RoomState {
        'broadcaster-lang'?: string | null;
        'subs-only'?: boolean;
        'slow'?: number | false;
        'r9k'?: boolean;
        'emote-only'?: boolean;
        'followers-only'?: number | false;
        'channel': string;
    }
}