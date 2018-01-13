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

function fromObjectToEmberObject(object) {
    const emberObject = EmberObject.create();

    for (const key in object) {
        const keyObject = object[key];
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

function updateEmberArrrayFromArray(emberArray, array) {
    array.forEach(function(object) {
        const emberObject = emberArray.findBy('id', object.id);
        if(emberObject) {
            updateEmberObjectFromObject(emberObject, object);
        } else {
            emberArray.pushObject(fromObjectToEmberObject(object));
        }
    });

    emberArray.forEach(function(emberObject) {
        const object = array.find(item => item.id === emberObject.get('id'))
        if (!object) {
            emberArray.removeObject(emberObject);
        }
    })
}

function updateEmberObjectFromObject(emberObject, object) {
    for (const key in object) {

        const keyObject = object[key];
        const keyEmberObject = emberObject.get(key);

        if (Array.isArray(keyObject) && Array.isArray(keyEmberObject)) {
            updateEmberArrrayFromArray(keyEmberObject, keyObject)
        } else if (Array.isArray(keyObject)) {
            emberObject.set(key, fromArrayToEmberArray(keyObject));
        } else if (keyObject && typeof keyObject === 'object' && keyEmberObject && typeof keyEmberObject === 'object') {
            updateEmberObjectFromObject(emberObject.get(key), keyObject);
        } else if (keyObject && typeof keyObject === 'object') {
            keyEmberObject.set(key, fromObjectToEmberObject(keyObject));
        } else if(keyObject !== keyEmberObject) {
            emberObject.set(key, keyObject);
        }
    }
}

export default {fromObjectToEmberObject, updateEmberObjectFromObject};
