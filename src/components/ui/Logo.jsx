import { useTheme } from '../../context/ThemeContext.jsx';
import logoDark from '../../assets/images/logos/logo-dark.png';
import logoLight from '../../assets/images/logos/logo-light.png';

export default function Logo({ className = '' }) {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? logoDark : logoLight;

  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="Device-Nova"
        className="h-14 w-auto flex-shrink-0"
      />
    </span>
  );
}
