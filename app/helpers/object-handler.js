    import EmberObject from '@ember/object';
    import { A } from '@ember/array';

    function fromArrayToEmberArray(array) {
        const emberArray = A();
        array.forEach(function(item) {
            if (Array.isArray(item)) {
                emberArray.push(fromArrayToEmberArray(item));
            } else if (item && typeof item === 'object') {
                emberArray.push(fromObjectToEmberObject(item));
            } else {
                emberArray.push(item);
            }
        });
        return emberArray;
    }

    function fromObjectToEmberObject(pojo) {
        const emberObject = EmberObject.create();

        for (const key in pojo) {
            const keyObject = pojo[key];
             if (Array.isArray(keyObject)) {
                emberObject.set(key, fromArrayToEmberArray(keyObject))
            } else if (keyObject && typeof keyObject === 'object') {
                emberObject.set(key, fromObjectToEmberObject(keyObject))
            } else {
                emberObject.set(key, keyObject);
            }
        }

        return emberObject;
    }

    export default {fromObjectToEmberObject};
