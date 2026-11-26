import React from 'react';
import {
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Sparkles,
  HardHat,
  Wrench,
  Layers,
} from 'lucide-react';
import type { TradeCategoryId } from '../../types/kaamkavach';

interface CategoryIconProps {
  category: TradeCategoryId;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  className = 'h-5 w-5',
}) => {
  switch (category) {
    case 'electrician':
      return <Zap className={className} />;
    case 'plumber':
      return <Droplets className={className} />;
    case 'carpenter':
      return <Hammer className={className} />;
    case 'painter':
      return <Paintbrush className={className} />;
    case 'cleaner':
      return <Sparkles className={className} />;
    case 'construction':
      return <HardHat className={className} />;
    case 'appliance':
      return <Wrench className={className} />;
    default:
      return <Layers className={className} />;
  }
};
