import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App.jsx';

describe('App Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows loading spinner initially', () => {
    render(<App />);
    expect(screen.getByText('加载3D技术栈...')).toBeInTheDocument();
  });

  it.skip('renders header after loading', () => {
    render(<App />);
    vi.advanceTimersByTime(2000);
    expect(screen.getByText('技术栈3D展示')).toBeInTheDocument();
  });
});
