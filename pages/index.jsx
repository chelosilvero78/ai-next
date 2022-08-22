import { PublicLayout } from '../components/layouts/PublicLayout';
import MainBanner from "../components/Web/MainBanner";
import HomePublicTopic from "../components/Web/HomePublicTopic";
import HowSystemWork from "../components/Web/HowSystemWork";
import ReviewsCourses from "../components/Web/ReviewsCourses";


export default function HomePage() {

  return (  
    <PublicLayout title={'Auditoria Interna'} pageDescription={'Home | Sitio Web de Auditori Interna'}>
      <MainBanner />
      <HomePublicTopic />
      <HowSystemWork />
      <ReviewsCourses />
    </PublicLayout>
  )
}