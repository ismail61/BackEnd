import React from 'react';

const Input = ({value,name,handler,msg}) => {
    //console.log(error)
    return (
        <div>
            <div className="form-group">
                <input value={value} onChange={handler} name={name} placeholder={msg}
                 className="form-control" type="text" />
            </div>
        </div>
    );
};

export default Input;