import {
  User as PersonIcon,
  Users as GroupIcon,
  GraduationCap as SchoolIcon,
  BarChart3 as BarChartIcon,
  FileText as AssessmentIcon,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

interface ReportCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  status: 'available' | 'coming-soon';
}

export default function ReportsPage() {
  const navigate = useNavigate();

  const reportCards: ReportCard[] = [
    {
      title: '학생 성취기록카드',
      description: '개별 학생의 핸드북 진도와 출석 현황을 확인할 수 있는 상세 보고서입니다.',
      icon: <PersonIcon />,
      path: '/reports/student-progress',
      color: 'primary',
      status: 'available',
    },
    {
      title: '교회 통계 대시보드',
      description: '교회 전체 학생 수, 출석율, 진도율 등의 종합 통계를 제공합니다.',
      icon: <BarChartIcon />,
      path: '/reports/church-statistics',
      color: 'success',
      status: 'available',
    },
    {
      title: '클럽별 보고서',
      description: 'SPARKS, CUBBIES 등 클럽별 학생 현황과 진도 통계를 확인합니다.',
      icon: <SchoolIcon />,
      path: '/reports/club-reports',
      color: 'info',
      status: 'coming-soon',
    },
    {
      title: '출석 분석 보고서',
      description: '월별/주별 출석 현황과 패턴을 분석한 상세 보고서입니다.',
      icon: <AssessmentIcon />,
      path: '/reports/attendance-analysis',
      color: 'warning',
      status: 'coming-soon',
    },
    {
      title: '진도율 분석 보고서',
      description: '학생들의 핸드북 진도율을 분석하고 개선 방향을 제시합니다.',
      icon: <GroupIcon />,
      path: '/reports/progress-analysis',
      color: 'secondary',
      status: 'coming-soon',
    },
  ];

  const handleReportClick = (report: ReportCard) => {
    if (report.status === 'available') {
      navigate(report.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          보고서 📊
        </h1>
        <p className="text-muted-foreground">
          다양한 통계와 분석 보고서를 통해 학생들의 성장과 진도를 효과적으로 관리하세요.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((report, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              report.status === 'coming-soon' ? 'opacity-70' : 'hover:-translate-y-1'
            }`}
            onClick={() => handleReportClick(report)}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-3">
                  {report.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">
                    {report.title}
                  </h3>
                  {report.status === 'coming-soon' && (
                    <Badge variant="outline" className="mt-1">
                      준비중
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground text-sm flex-grow">
                {report.description}
              </p>
              {report.status === 'available' && (
                <div className="mt-4">
                  <Button size="sm">
                    보기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          💡 보고서 활용 Tip
        </h2>
        <div className="space-y-2 text-muted-foreground">
          <p>• 학생 성취기록카드는 학부모 상담 시 유용하게 활용할 수 있습니다.</p>
          <p>• 정기적인 보고서를 통해 학생들의 성장 추이를 파악하고 개선 방향을 설정하세요.</p>
          <p>• 데이터 기반 의사결정으로 더 효과적인 교육 프로그램을 운영할 수 있습니다.</p>
        </div>
      </Card>
    </div>
  );
}
