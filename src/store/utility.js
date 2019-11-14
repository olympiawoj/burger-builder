//Update object utilty function which I can use in reducers for refactoring

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}