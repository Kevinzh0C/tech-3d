import React from 'react';

/**
 * Button component for the 3D Tech Stack Visualization.
 * Supports primary/secondary variants and active state.
 * Properly aligned on mobile via CSS media queries in buttons.css.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label/content
 * @param {'primary'|'secondary'} [props.variant='secondary'] - Button style variant
 * @param {boolean} [props.active=false] - Whether the button is in active/selected state
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional CSS class names
 * @param {string} [props.ariaLabel] - Accessible label for the button
 */
const Button = ({
  children,
  variant = 'secondary',
  active = false,
  onClick,
  className = '',
  ariaLabel,
  ...rest
}) => {
  const classNames = [
    'btn',
    `btn--${variant}`,
    active ? 'btn--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
