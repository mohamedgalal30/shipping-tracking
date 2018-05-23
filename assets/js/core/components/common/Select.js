import React from 'react';
import PropTypes from 'prop-types';
/*This component consists of select element that takes  array of elements which can be anything objects or texts etc... 
map it to array of objects and it represents those objects as dropdownlist 
with the object id as key and object value as value */
const Select = ({ data, ...props }) => {
    let mappedObjects = data.map((element, i) => {
        if (typeof (element) === "object")
            return element;
        return { id: element + i, value: element, text: element }
    });
    return (
        <select {...props} className="form-control">
            {mappedObjects.map((e, i) => {
                return <option key={e.id} value={e.value}>{e.text}</option>;
            })}
        </select>
    )
}


Select.propTypes = {
    data: PropTypes.array.isRequired
}

export default Select;