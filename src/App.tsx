import { FC } from 'react'
import './App.scss'
import { Converter } from 'components/Converter/Converter'
import { Footer } from 'components/Footer/Footer'
import { Header } from 'components/Header/Header'
import CurrencysProvider from 'providers/CurrencysProvider'

const App: FC = () => {
  return (
    <div className="App">
      <CurrencysProvider>
        <Header />
        <div className="container">
          <main>
            <Converter />
          </main>
        </div>
        <Footer />
      </CurrencysProvider>
    </div>
  )
}

export default App
