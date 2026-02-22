import React from 'react';
import '../css/components/buttons.css';

/**
 * Button component for category filtering.
 *
 * @param {Object}   props
 * @param {string}   props.label      - Visible button text.
 * @param {boolean}  [props.active]   - Whether the button is currently selected.
 * @param {string}   [props.variant]  - Optional category variant: 'language' | 'framework' | 'infrastructure'.
 * @param {function} [props.onClick]  - Click handler.
 * @param {string}   [props.className]- Additional CSS class names.
 */
const Button = ({ label, active = false, variant = '', onClick, className = '' }) => {
  const classes = [
    'button',
    active ? 'button--active' : '',
    variant ? `button--${variant}` : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
};

export default Button;
