import BarraHerramientas from '../components/commons/BarraHerramientas';
import Formularios from '../components/commons/Formularios';
import Navbar from '../components/commons/Navbar';
import Sidebar from '../components/commons/Sidebar';

export default function MenuPage() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main>
        <BarraHerramientas />
        <Formularios />
      </main>
    </>
  )
}


// AboutPage.getLayout = function getLayout(page) {
//   return (
//     <MainLayout>
//       <DarkLayout>
//         {page}
//       </DarkLayout>
//     </MainLayout>
//   )
// }