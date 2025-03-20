import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './myButton.module.css';

interface IMyButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  func?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'easy';
  to?: string; // Добавим свойство для маршрута
}

function MyButton({ type = 'submit', text = 'click!', func = () => { }, disabled = false, variant = 'primary', to }: IMyButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to); // Переход на другую страницу
    }
    func(); // Вызов переданной функции, если она есть
  };

  return (
    <button
      type={type}
      onClick={handleClick} 
      className={cn(styles.myButton, {
        [styles.primary]: variant === 'primary',
        [styles.danger]: variant === 'danger',
        [styles.easy]: variant === 'easy',
        [styles.disabled]: disabled === true
      })}
    >
      {text}
    </button>
  );
}

export default MyButton;
