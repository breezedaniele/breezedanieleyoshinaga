import React from 'react';
import fulllogo from '../assets/images/breeze_daniele_logo_1791322631894.jpg';
import emblemIcon from '..assets/images/breeze_daniele_emblem_1791322645456.jpg';

const FULL_LOGO_URL = fulllogo
const EMBLEM_ICON_URL = emblemIcon

interface LogoProps {
  className?: string;
  size?: number | string;
  iconOnly?: boolean;
  alt?: string;
}

export default function Logo({
  className = '',
  size = 200,
  iconOnly = false,
  alt = 'Breeze Daniele Yoshinaga Foundation'
}: LogoProps) {
  const imgSrc = iconOnly ? EMBLEM_ICON_URL : FULL_LOGO_URL;
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      style={{ width: dimension, height: dimension }}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      <img
        src={imgSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain rounded-2xl drop-shadow-sm transition-transform duration-300"
      />
    </div>
  );
}
