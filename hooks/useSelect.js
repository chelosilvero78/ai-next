import React, {useState} from 'react';

const useSelect = (stateInicial, opciones) => {

    // state del custom hook
    const [state, actualizarState] = useState(stateInicial);

    const SelectOpciones =  () => (
        <select className="bnt-seleccion"
            className="browser-default"
            value={state}
            onChange={e => actualizarState(e.target.value)}
        >
            {opciones.map(opcion => (
                <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
            ))}
        </select>
    );

    return [state, SelectOpciones];
}
 
export default useSelect;

//******************************************************************************************
// //=========uso del custom hooks
// import useSelect from '../hooks/useSelect';

// const Formulario = ({guardarCategoria}) => {

//    const OPCIONES=[{value:'general',label:'General'},{value:'science',label:'Ciencia'},{value:'sports',label:'Deportes'},{value:'technology',label:'Tecnología'}]
// // utilizar custom hook
//     const [ categoria, SelectOpciones ] = useSelect('general', OPCIONES);