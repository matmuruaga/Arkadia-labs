import { Helmet } from 'react-helmet-async';
import '@/styles/report.css';

interface ReportLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ReportLayout: React.FC<ReportLayoutProps> = ({ title, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="report min-h-screen">
      {children}
    </div>
  </>
);

export default ReportLayout;
