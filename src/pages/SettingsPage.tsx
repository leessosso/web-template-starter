import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { ThemeSelector } from '../components/ui/ThemeSelector';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">설정</h1>
        <p className="text-muted-foreground mt-2">
          테마 및 앱 설정을 관리할 수 있습니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>테마 설정</CardTitle>
          <CardDescription>
            앱의 색상 테마와 모드를 변경할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>
    </div>
  );
}

