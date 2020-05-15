// Checks if questions array is empty. Not really being used at the moment properly.

const IsEmpty = (value) => 
    value === undefined || 
    value == null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

export default IsEmpty;