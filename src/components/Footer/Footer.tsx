import { FC, useMemo } from 'react'
import style from './Footer.module.scss'

export const Footer: FC = () => {
  const currentYear = useMemo(() => {
    return new Date().getUTCFullYear()
  }, [])
  return (
    <footer className={style.footer}>
      <div className="wrapper">© {currentYear} made for Beast studio</div>
    </footer>
  )
}
