class EventMapBuilder {
    #eventMap = {}

    constructor(targetable) {
        const registry = this;

        this._module = targetable.esModule({
            module: '@magebit/events/lib/talons/eventCollection.js',
            publish(targets) {
                targets.events.call(registry);
            }
        });
    }

    /**
     * Essentially JSON.stringify for this.#eventMap, but having all callbacks as fn names instead of string literals
     *
     * @return {string}
     */
    #buildCollectionMapConstructor() {
        if (Object.keys(this.#eventMap).length === 0) return '';

        let result = [];

        Object.keys(this.#eventMap).forEach(key => {
            result.push(`["${key}", [${this.#eventMap[key].join(', ')}]]`);
        });

        return `[\n${result.join(',\n')}\n]`;
    }

    #buildCollectionString() {
        return `const collection = new Map(${this.#buildCollectionMapConstructor()});`
    }

    #addEvent(type, importName) {
        if (!(type in this.#eventMap)) this.#eventMap[type] = [];

        this.#eventMap[type].push(importName);
    }

    /**
     * @param {string} type event name fired by EventingContext
     * @param {string} path callback import path
     * @param {string} [method] method name that's exported by import path. Not required if it's the default export
     */
    add({ type, path, method = null }) {
        const callback = this._module.addImport(`import ${method ? `{${method}}` : 'callback'} from "${path}"`);
        const prevCollectionString = this.#buildCollectionString();

        this.#addEvent(type, callback.toString());

        this._module.spliceSource({
            before: prevCollectionString,
            remove: prevCollectionString.length,
            insert: this.#buildCollectionString()
        });
    }
}

module.exports = EventMapBuilder;
