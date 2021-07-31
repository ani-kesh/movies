import PropTypes from 'prop-types';
let classNames = require('classnames');

let labelClass = classNames({
    "block":true,
    "text-grey-darker":true,
    "text-sm":true,
    "font-bold":true,
    "mb-2":true,
  });

export default function Label({className,label}){
    return  (
    <label className={className}>
        {label}
    </label>
    );
}

Label.propTypes={
    className:PropTypes.string,
    label:PropTypes.string,
}

Label.defaultProps = {
    className:labelClass,
    label:""
  };