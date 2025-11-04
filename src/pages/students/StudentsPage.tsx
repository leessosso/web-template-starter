import { useEffect, useState } from 'react';
import {
  Plus as AddIcon,
  Edit as EditIcon,
  Trash2 as DeleteIcon,
  Search as SearchIcon,
  User as PersonIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import { isAdmin } from '../../utils/permissions';
import type { Student } from '../../models/Student';
import type { User } from '../../models/User';

export default function StudentsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    students,
    isLoading,
    error,
    fetchStudents,
    deleteStudent
  } = useStudentStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);

  // 선생님 목록 가져오기
  useEffect(() => {
    const fetchTeachers = async () => {
      if (user?.churchId) {
        try {
          const teacherList = await userService.getTeachersByChurch(user.churchId);
          setTeachers(teacherList);
        } catch (error) {
          console.error('선생님 목록 가져오기 실패:', error);
        }
      }
    };
    fetchTeachers();
  }, [user?.churchId]);

  useEffect(() => {
    if (user?.churchId) {
      fetchStudents();
    }
  }, [user?.churchId, fetchStudents]);

  // 선생님 ID로 선생님 이름을 찾는 함수
  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return '미배정';
    const teacher = teachers.find(t => t.uid === teacherId);
    return teacher?.displayName || '알 수 없음';
  };

  useEffect(() => {
    if (students) {
      const filtered = students.filter(student => {
        const teacherName = getTeacherName(student.assignedTeacherId);
        return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               teacherName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredStudents(filtered);
    }
  }, [students, searchTerm, teachers]);

  const handleDeleteStudent = async (studentId: string) => {
    if (window.confirm('정말로 이 학생을 삭제하시겠습니까?')) {
      await deleteStudent(studentId);
    }
  };

  const getGradeText = (grade: number) => {
    const grades = ['Puggles', 'Cubbies', 'Sparks', 'T&T'];
    return grades[grade - 1] || '알 수 없음';
  };

  const getGenderText = (gender: 'male' | 'female') => {
    return gender === 'male' ? '남자' : '여자';
  };

  return (
    <div className="space-y-6">
      {/* 모바일 우선 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {isAdmin(user) ? '학생 관리' : '학생 조회'}
        </h1>
        {isAdmin(user) && (
          <Button
            onClick={() => navigate('/students/new')}
            className="w-full sm:w-auto"
          >
            <AddIcon className="w-4 h-4 mr-2" />
            학생 추가
          </Button>
        )}
      </div>

      {/* 모바일 우선 검색 */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={isAdmin(user) ? "학생 이름 또는 담당 선생님으로 검색" : "학생 이름으로 검색"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* 모바일 우선 학생 목록 */}
      {isLoading ? (
        <div className="text-center py-8">
          <p>로딩 중...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 학생이 없습니다.'}
          </p>
        </div>
      ) : (
        // 카드 형태
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-grow">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                      <PersonIcon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">
                        {student.name}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">
                          {getGradeText(student.grade)}
                        </Badge>
                        <Badge variant="outline">
                          {getGenderText(student.gender)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        담당: {getTeacherName(student.assignedTeacherId) || '미배정'}
                      </p>
                    </div>
                  </div>
                  {isAdmin(user) && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/students/${student.id}/edit`)}
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredStudents.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          총 {filteredStudents.length}명의 학생
        </div>
      )}

      {/* 모바일 FAB 버튼 */}
      {isAdmin(user) && (
        <Button
          className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg md:hidden"
          size="icon"
          onClick={() => navigate('/students/new')}
        >
          <AddIcon className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
