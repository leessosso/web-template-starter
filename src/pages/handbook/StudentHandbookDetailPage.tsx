import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { useStudentStore } from '../../store/studentStore';
import { useSparksHandbookStore } from '../../store/sparksHandbookStore';
import { useAuthStore } from '../../store/authStore';
import {
  SPARKS_HANDBOOKS,
  JEWEL_TYPE_LABELS,
  generateJewelSections,
  sectionToString,
} from '../../constants/sparksHandbooks';
import { SparksHandbook, JewelType } from '../../models/SparksHandbookProgress';
import type { JewelSection } from '../../models/SparksHandbookProgress';

export default function StudentHandbookDetailPage() {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { user } = useAuthStore();

  const { students, fetchStudents } = useStudentStore();
  const {
    studentSummaries,
    studentProgresses,
    error,
    fetchStudentSummary,
    fetchStudentProgress,
    createJewelSectionProgress,
    deleteJewelSectionProgress,
  } = useSparksHandbookStore();

  const [selectedHandbook, setSelectedHandbook] = useState<SparksHandbook | ''>('');
  const [selectedJewelType, setSelectedJewelType] = useState<JewelType | ''>('');
  const [completionStatus, setCompletionStatus] = useState<Map<string, boolean>>(new Map());
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<JewelSection | null>(null);
  const [isCompletedSection, setIsCompletedSection] = useState(false);

  // 학생 정보 찾기
  const student = students?.find(s => s.id === studentId);
  const summary = studentId ? studentSummaries.get(studentId) : undefined;

  // 학생 목록 로드
  useEffect(() => {
    if (user?.churchId) {
      fetchStudents();
    }
  }, [user?.churchId, fetchStudents]);

  useEffect(() => {
    if (studentId && user?.churchId) {
      fetchStudentSummary(studentId, user.churchId!);
      fetchStudentProgress(studentId, user.churchId!);
    }
  }, [studentId, user?.churchId, fetchStudentSummary, fetchStudentProgress]);

  // 학생 요약 정보가 로드되면 최근 핸드북 자동 선택
  useEffect(() => {
    if (summary?.currentHandbook && selectedHandbook === '') {
      setSelectedHandbook(summary.currentHandbook);
    }
  }, [summary, selectedHandbook]);

  // 핸드북 선택 시 완료 상태 로드
  useEffect(() => {
    const loadCompletionStatus = async () => {
      if (selectedHandbook && studentId && user?.churchId) {
        try {
          const status = await import('../../services/sparksHandbookService').then(
            ({ sparksHandbookService }) =>
              sparksHandbookService.getHandbookCompletionStatus(studentId, selectedHandbook, user.churchId!)
          );
          setCompletionStatus(status);
        } catch (error) {
          console.error('완료 상태 로드 실패:', error);
        }
      }
    };

    loadCompletionStatus();
  }, [selectedHandbook, studentId, user?.churchId]);

  // 완료 처리 후 상태 새로고침
  const refreshCompletionStatus = async () => {
    if (selectedHandbook && studentId && user?.churchId) {
      try {
        const status = await import('../../services/sparksHandbookService').then(
          ({ sparksHandbookService }) =>
            sparksHandbookService.getHandbookCompletionStatus(studentId, selectedHandbook, user.churchId!)
        );
        setCompletionStatus(status);
      } catch (error) {
        console.error('완료 상태 새로고침 실패:', error);
      }
    }
  };

  const handleSectionClick = (section: JewelSection, jewelType: JewelType) => {
    if (!selectedHandbook) {
      alert('먼저 핸드북을 선택해주세요.');
      return;
    }

    const isCompleted = isSectionCompleted(jewelType, section);

    setSelectedSection(section);
    setSelectedJewelType(jewelType);
    setIsCompletedSection(isCompleted);
    setConfirmDialogOpen(true);
  };

  const handleConfirmCompletion = async () => {
    if (!studentId || !selectedHandbook || !selectedJewelType || !selectedSection) return;

    try {
      await createJewelSectionProgress({
        studentId,
        handbook: selectedHandbook,
        jewelType: selectedJewelType,
        section: selectedSection,
        completedDate: new Date(),
      });

      setConfirmDialogOpen(false);
      setSelectedSection(null);
      setSelectedJewelType('');
      setIsCompletedSection(false);

      // 완료 상태 및 진도 요약 새로고침
      await refreshCompletionStatus();
      if (user?.churchId) {
        await fetchStudentSummary(studentId, user.churchId);
      }
    } catch (error) {
      console.error('진도 등록 실패:', error);
    }
  };

  const handleCancelCompletion = async () => {
    if (!studentId || !selectedHandbook || !selectedJewelType || !selectedSection) return;

    try {
      // 해당 섹션의 진도 ID 찾기
      const studentProgress = studentProgresses.get(studentId);
      if (!studentProgress) return;

      const progress = studentProgress.find(p =>
        p.handbook === selectedHandbook &&
        p.jewelType === selectedJewelType &&
        p.section.major === selectedSection.major &&
        p.section.minor === selectedSection.minor
      );

      if (!progress) return;

      // 진도 삭제
      await deleteJewelSectionProgress(progress.id);

      setConfirmDialogOpen(false);
      setSelectedSection(null);
      setSelectedJewelType('');
      setIsCompletedSection(false);

      // 완료 상태 및 진도 요약 새로고침
      await refreshCompletionStatus();
      if (user?.churchId) {
        await fetchStudentSummary(studentId, user.churchId);
        await fetchStudentProgress(studentId, user.churchId);
      }
    } catch (error) {
      console.error('진도 취소 실패:', error);
    }
  };

  const getSectionKey = (jewelType: JewelType, section: JewelSection) => {
    return `${jewelType}-${section.major}-${section.minor}`;
  };

  const isSectionCompleted = (jewelType: JewelType, section: JewelSection) => {
    return completionStatus.get(getSectionKey(jewelType, section)) || false;
  };

  const getSectionCompletedDate = (jewelType: JewelType, section: JewelSection) => {
    if (!studentId) return null;

    const studentProgress = studentProgresses.get(studentId);
    if (!studentProgress) return null;

    const progress = studentProgress.find(p =>
      p.handbook === selectedHandbook &&
      p.jewelType === jewelType &&
      p.section.major === section.major &&
      p.section.minor === section.minor
    );

    return progress?.completedDate || null;
  };

  if (!student) {
    return (
      <div className="text-center py-8">
        <h2 className="text-lg font-semibold">학생을 찾을 수 없습니다.</h2>
        <Button onClick={() => navigate('/handbook')} className="mt-4">
          핸드북 관리로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/handbook')}
          className="self-start"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {student.name} - SPARKS 핸드북
          </h1>
          <p className="text-muted-foreground">
            {student.gender === 'male' ? '남' : '여'}학생
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 핸드북 선택 */}
      <Card className="p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          핸드북 선택
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="w-full sm:w-48">
            <label className="text-sm font-medium mb-2 block">핸드북</label>
            <Select
              value={selectedHandbook}
              onValueChange={(value) => setSelectedHandbook(value as SparksHandbook)}
            >
              <SelectTrigger>
                <SelectValue placeholder="핸드북 선택" />
              </SelectTrigger>
              <SelectContent>
                {SPARKS_HANDBOOKS.map((handbook) => (
                  <SelectItem key={handbook.id} value={handbook.id}>
                    {handbook.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedHandbook && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              선택한 핸드북의 전체 보석 진도를 확인하세요. 빨강 보석과 초록 보석을 모두 볼 수 있습니다.
            </p>
          </div>
        )}
      </Card>

      {/* 보석 그리드 */}
      {selectedHandbook && (
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            {SPARKS_HANDBOOKS.find(h => h.id === selectedHandbook)?.label} 전체 진도
          </h2>

          {/* 빨강 보석 섹션 */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-red-600 mb-2">
              🔴 빨강 보석
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1 sm:gap-2">
              {generateJewelSections().map((section) => {
                const isCompleted = isSectionCompleted(JewelType.RED, section);
                const completedDate = getSectionCompletedDate(JewelType.RED, section);
                return (
                  <div key={`red-${section.major}-${section.minor}`}>
                    <Card
                      className={`cursor-pointer border-2 h-12 sm:h-16 flex flex-col transition-shadow hover:shadow-md ${isCompleted
                        ? 'border-green-500 bg-red-50 dark:bg-red-950/40'
                        : 'border-border bg-card'
                        }`}
                      onClick={() => handleSectionClick(section, JewelType.RED)}
                    >
                      <CardContent className="p-1 sm:p-2 text-center flex-1 flex flex-col justify-center">
                        {/* 섹션 번호 */}
                        <p className={`text-xs sm:text-sm font-medium mb-1 ${isCompleted ? 'text-gray-900 dark:text-gray-100' : ''}`}>
                          {sectionToString(section)}
                        </p>
                        {/* 체크 아이콘과 날짜 */}
                        {isCompleted && (
                          <div className="flex items-center justify-center">
                            <CheckCircle className="text-green-500 dark:text-green-400 w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5" />
                            {completedDate && (
                              <span className="text-xs text-green-500 dark:text-green-400 font-medium">
                                {completedDate.toLocaleDateString('ko-KR', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 초록 보석 섹션 */}
          <div>
            <h3 className="text-base font-medium text-green-600 mb-2">
              🟢 초록 보석
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1 sm:gap-2">
              {generateJewelSections().map((section) => {
                const isCompleted = isSectionCompleted(JewelType.GREEN, section);
                const completedDate = getSectionCompletedDate(JewelType.GREEN, section);
                return (
                  <div key={`green-${section.major}-${section.minor}`}>
                    <Card
                      className={`cursor-pointer border-2 h-12 sm:h-16 flex flex-col transition-shadow hover:shadow-md ${isCompleted
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/40'
                        : 'border-border bg-card'
                        }`}
                      onClick={() => handleSectionClick(section, JewelType.GREEN)}
                    >
                      <CardContent className="p-1 sm:p-2 text-center flex-1 flex flex-col justify-center">
                        {/* 섹션 번호 */}
                        <p className={`text-xs sm:text-sm font-medium mb-1 ${isCompleted ? 'text-gray-900 dark:text-gray-100' : ''}`}>
                          {sectionToString(section)}
                        </p>
                        {/* 체크 아이콘과 날짜 */}
                        {isCompleted && (
                          <div className="flex items-center justify-center">
                            <CheckCircle className="text-green-500 dark:text-green-400 w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5" />
                            {completedDate && (
                              <span className="text-xs text-green-500 dark:text-green-400 font-medium">
                                {completedDate.toLocaleDateString('ko-KR', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* 진도 요약 */}
      {summary && (
        <Card className="p-4 sm:p-6 mt-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            진도 요약
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <Badge variant={summary.currentHandbook === SparksHandbook.HANG_GLIDER ? 'default' : 'outline'} className="w-full sm:w-auto justify-start sm:justify-center">
              HangGlider: {summary.hangGliderProgress.redCompleted}/16 + {summary.hangGliderProgress.greenCompleted}/16
            </Badge>
            <Badge variant={summary.currentHandbook === SparksHandbook.WING_RUNNER ? 'default' : 'outline'} className="w-full sm:w-auto justify-start sm:justify-center">
              WingRunner: {summary.wingRunnerProgress.redCompleted}/16 + {summary.wingRunnerProgress.greenCompleted}/16
            </Badge>
            <Badge variant={summary.currentHandbook === SparksHandbook.SKY_STORMER ? 'default' : 'outline'} className="w-full sm:w-auto justify-start sm:justify-center">
              SkyStormer: {summary.skyStormerProgress.redCompleted}/16 + {summary.skyStormerProgress.greenCompleted}/16
            </Badge>
          </div>
        </Card>
      )}

      {/* 완료/취소 확인 다이얼로그 */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-lg font-semibold">
              {isCompletedSection ? '진도 취소 확인' : '진도 완료 확인'}
            </DialogTitle>
            <DialogDescription>
              {selectedSection && selectedJewelType && (
                <>
                  <strong>{JEWEL_TYPE_LABELS[selectedJewelType]}</strong>의{' '}
                  <strong>{sectionToString(selectedSection)}</strong> 섹션을{' '}
                  {isCompletedSection ? '취소' : '완료로 표시'}하시겠습니까?
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmDialogOpen(false)}
            >
              닫기
            </Button>
            <Button
              size="sm"
              variant={isCompletedSection ? 'destructive' : 'default'}
              onClick={isCompletedSection ? handleCancelCompletion : handleConfirmCompletion}
            >
              {isCompletedSection ? '취소하기' : '완료하기'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
