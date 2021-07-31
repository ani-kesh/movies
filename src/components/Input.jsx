import PropTypes from 'prop-types';
let classNames = require('classnames');

const inputClass = classNames({
    "shadow":true,
    "appearance-none":true,
    "border":true,
    "rounded":true,
    "w-full":true,
    "py-2":true,
    "px-3":true,
    "text-grey-darker":true,
  });

export default function Input({className,id,type,placeholder,name}){
    return  <input className={className} id={id} type={type} name={name} placeholder={placeholder}/>
}

Input.propTypes={
    className:PropTypes.string,
    id:PropTypes.string,
    type:PropTypes.string,
    placeholder:PropTypes.string,
    name:PropTypes.string,
}

Input.defaultProps = {
    className:inputClass,
    id:"",
    type:"text",
    placeholder:"",
    name:""
  };