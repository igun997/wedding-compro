import WelcomeSection from './WelcomeSection';

const RenderSection = ({ component, ...props }: any) => {
  switch (component) {
    case 'welcome_section':
      return <WelcomeSection {...props} />;
    default:
      return null;
  }
};

export default RenderSection;
