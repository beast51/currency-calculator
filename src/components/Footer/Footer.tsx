import { FC } from 'react';
import s from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={s.footer}>
      <div className="wrapper">© 2022 made for ITOP1000</div>
    </footer>
  );
};
