import Head from 'next/head';
import { AiLayout } from '../components/layouts';


export default function HomePage() {

  return (
    <>
      <h1> DESDE INDEX</h1>
    </>
  )
}


HomePage.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>AI_20171219_1128</title>
      </Head><AiLayout>
        {page}
      </AiLayout>
    </>
  )
}