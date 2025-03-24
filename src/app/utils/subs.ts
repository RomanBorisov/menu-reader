import { Subscription } from 'rxjs';

/**
 * TODO implement conditions to notify about forgotten subscriptions
 * Conditions: router change, logout, etc...
 */
export class Subs {
    private _subs: Subscription[] = [];

    set add(sub: Subscription) {
        this._subs.push(sub);
    }

    public log() {
        console.info(this._subs);
    }

    public unsubscribe() {
        this._subs.forEach((sub) => sub.unsubscribe());
        this._subs = [];
    }
}
