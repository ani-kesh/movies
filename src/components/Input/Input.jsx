import PropTypes from "prop-types";

export default function Input({
  className,
  id,
  type,
  placeholder,
  name,
  onChange,
}) {
  return (
    <input
      className={`${className}`}
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

Input.defaultProps = {
  id: "",
  type: "text",
  placeholder: "",
  name: "",
};

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
