import PropTypes from 'prop-types';
let classNames = require('classnames');

let buttonClass = classNames({
    "bg-black":true,
    "hover:bg-blue-dark":true,
    "hover:bg-opacity-100":true,
    "text-yellow-500":true,
    "bg-opacity-70":true,
     "font-bold":true,
     "py-2":true,
     "px-4":true,
     "rounded":true,
  });

export default function Button({className,type,label,disabled}){
    return  (
        <button className={className} type={type} disabled={disabled}>
            {label}
        </button>
    );
}

Button.propTypes={
    className:PropTypes.string,
    type:PropTypes.string,
    label:PropTypes.string,
    disabled:PropTypes.bool,
}

Button.defaultProps = {
    className:buttonClass,
    type:"button",
    label:"",
    disabled:false
  };