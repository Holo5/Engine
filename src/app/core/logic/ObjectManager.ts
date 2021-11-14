import { Manager } from './Manager';
import { Core } from '../Core';
import { Disposable } from '../../../common/disposable/Disposable';

export class ObjectManager<I, O extends Disposable> extends Manager {
    protected objects: Map<I, O>;

    constructor(core: Core) {
        super(core);

        this.objects = new Map<I, O>();
    }

    public getAll(): Map<I, O> {
        return this.objects;
    }

    public find(id: I) {
        return this.objects.get(id);
    }

    public add(id: I, object: O) {
        this.objects.set(id, object);
    }

    public removeUnitById(id: I) {
        const object = this.find(id);

        if (object !== undefined) {
            object.dispose();
            this.objects.delete(id);
        }
    }

    public clear() {
        this.objects.forEach((object) => {
            object.dispose();
        });

        this.objects.clear();
    }
}
