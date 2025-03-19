import cn from 'classnames';
import styles from './myButton.module.css';


interface IMyButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  func?: () => void;
  // активная ли кнопка
  disabled?: boolean;
  // варианты цвета для кнопки
  variant?: 'primary' | 'danger' | 'easy';
}


function MyButton({ type = 'submit', text = 'click!', func = () => { }, disabled = false, variant = 'primary' }: IMyButtonProps) {
  return <button type={type} onClick={func} className={cn(styles.myButton, {
    [styles.primary]: variant === 'primary',
    [styles.danger]: variant === 'danger',
    [styles.easy]: variant === 'easy',
    [styles.disabled]: disabled === true
  })}>{text}</button>;
}

export default MyButton;


