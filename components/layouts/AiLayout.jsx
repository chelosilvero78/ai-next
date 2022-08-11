//import Head from 'next/head';
import { Header, Sidebar, Breadcrumb, Footer } from '../ui';

export const AiLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <Breadcrumb />
        <section className="content">
          {children}
        </section>
      </div>
      <Footer />
    </div>
  )
}