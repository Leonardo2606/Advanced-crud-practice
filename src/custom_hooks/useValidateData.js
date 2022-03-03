import React, {useState} from 'react';

function useValidarDados(allValidations) {

    function createInitialState(allValidations) {
        const initialState = {};
        for(let atrib in allValidations){
            initialState[atrib] = {valid:false, text:''};
        }
        return initialState;
    }
    const [erros, setErros] = useState(createInitialState(allValidations)); 

    const validarDado = (ev) => {
        const {name, value} = ev.target;
        const newState = allValidations[name](value);
        setErros(newState);
    }

    return [erros, validarDado];
    
}


export default useValidarDados;