import WelcomeSection from './WelcomeSection';
import MiniContactSection from './MiniContactSection';

const RenderSection = ({ component, ...props }: any) => {
  switch (component) {
    case 'welcome_section':
      return <WelcomeSection {...props} />;
    case 'mini_contact_section':
      return <MiniContactSection {...props} />;
    default:
      return null;
  }
};

export default RenderSection;
