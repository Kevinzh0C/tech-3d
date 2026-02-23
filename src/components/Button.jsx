import React from 'react';
import '../css/components/buttons.css';

/**
 * Reusable Button component with mobile-first responsive alignment.
 *
 * Props:
 * - variant: 'primary' | 'secondary' (default: 'primary')
 * - href: optional URL — renders an <a> tag instead of <button>
 * - children: button label / content
 * - className: additional CSS classes
 * - All other props are forwarded to the underlying element.
 */
const Button = ({ variant = 'primary', href, children, className = '', ...props }) => {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} role="button" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

/**
 * Container that aligns child buttons responsively.
 * On desktop the buttons sit in a row; on mobile they stack vertically and
 * center within the available width.
 */
const ButtonContainer = ({ children, className = '', ...props }) => (
  <div className={`button-container ${className}`.trim()} {...props}>
    {children}
  </div>
);

export { Button, ButtonContainer };
export default Button;
