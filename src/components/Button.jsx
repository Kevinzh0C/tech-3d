import React from 'react';

/**
 * Button Component
 *
 * A reusable, accessible button with responsive mobile alignment.
 * Supports primary, secondary, and ghost variants.
 *
 * Props:
 *   - variant: 'primary' | 'secondary' | 'ghost' (default: 'primary')
 *   - size: 'sm' | 'md' | 'lg' (default: 'md')
 *   - block: boolean - full-width button
 *   - wrap: boolean - allow text wrapping for long/translated labels
 *   - icon: ReactNode - optional icon element
 *   - href: string - renders as <a> if provided
 *   - children: button label
 *   - className: additional class names
 *   - ...rest: passed to underlying element
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  block = false,
  wrap = false,
  icon,
  href,
  children,
  className = '',
  ...rest
}) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    block ? 'btn-block' : '',
    wrap ? 'btn-wrap' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classNames} {...rest}>
      {content}
    </button>
  );
};

export default Button;
