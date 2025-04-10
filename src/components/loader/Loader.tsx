
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderCircle}></div>
      <img className={styles.loaderImg} src="/logoWillBeeDone1.png" alt="Logo" />
    </div>
  );
};

export default Loader;