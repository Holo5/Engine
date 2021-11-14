import { Incoming } from '../Incoming';

export class SecurityUnknown2Event extends Incoming {
    public process(): void {
        console.log('NI: SecurityUnknown2Event');
    }
}
