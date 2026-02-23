import React from 'react';

/**
 * Button component for category filtering with mobile-responsive alignment.
 *
 * @param {object}   props
 * @param {string}   props.label     – visible button text
 * @param {boolean}  props.isActive  – whether the button is currently selected
 * @param {string}   props.category  – category key used for variant styling
 * @param {function} props.onClick   – click / tap handler
 */
const Button = ({ label, isActive = false, category = '', onClick }) => {
  const classNames = [
    'btn',
    category ? `btn--${category}` : '',
    isActive ? 'btn--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
};

export default Button;
