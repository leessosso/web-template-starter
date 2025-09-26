import React from 'react';
import {
  DataTable,
  LineChart,
  BarChart,
  PieChart,
  type TableData
} from '../../components/data-visualization';
import { createColumnHelper } from '@tanstack/react-table';

// 샘플 데이터
const salesData = [
  { id: '1', name: '1월', sales: 4000, profit: 2400, customers: 240 },
  { id: '2', name: '2월', sales: 3000, profit: 1398, customers: 221 },
  { id: '3', name: '3월', sales: 2000, profit: 9800, customers: 229 },
  { id: '4', name: '4월', sales: 2780, profit: 3908, customers: 200 },
  { id: '5', name: '5월', sales: 1890, profit: 4800, customers: 218 },
  { id: '6', name: '6월', sales: 2390, profit: 3800, customers: 250 },
  { id: '7', name: '7월', sales: 3490, profit: 4300, customers: 210 },
  { id: '8', name: '8월', sales: 4000, profit: 2400, customers: 240 },
  { id: '9', name: '9월', sales: 3000, profit: 1398, customers: 221 },
  { id: '10', name: '10월', sales: 2000, profit: 9800, customers: 229 },
  { id: '11', name: '11월', sales: 2780, profit: 3908, customers: 200 },
  { id: '12', name: '12월', sales: 1890, profit: 4800, customers: 250 },
];

const categoryData = [
  { name: '전자제품', value: 35, color: '#0088FE' },
  { name: '의류', value: 25, color: '#00C49F' },
  { name: '식품', value: 20, color: '#FFBB28' },
  { name: '도서', value: 15, color: '#FF8042' },
  { name: '기타', value: 5, color: '#8884d8' },
];

const userData = [
  { id: '1', name: '김철수', email: 'kim@example.com', age: 25, status: '활성', joinDate: '2024-01-15' },
  { id: '2', name: '이영희', email: 'lee@example.com', age: 30, status: '활성', joinDate: '2024-02-20' },
  { id: '3', name: '박민수', email: 'park@example.com', age: 28, status: '비활성', joinDate: '2024-03-10' },
  { id: '4', name: '정수진', email: 'jung@example.com', age: 35, status: '활성', joinDate: '2024-04-05' },
  { id: '5', name: '강한빛', email: 'kang@example.com', age: 22, status: '활성', joinDate: '2024-05-12' },
];

const columnHelper = createColumnHelper<TableData>();

const userColumns = [
  columnHelper.accessor('name', {
    header: '이름',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: '이메일',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: '나이',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: '상태',
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          info.getValue() === '활성'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('joinDate', {
    header: '가입일',
    cell: (info) => info.getValue(),
  }),
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">데이터 애널리틱스</h1>
          <p className="mt-2 text-gray-600">
            매출, 사용자 데이터 등을 시각화하여 한눈에 파악할 수 있습니다.
          </p>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 월별 매출/수익 차트 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">월별 매출 및 수익</h2>
            <LineChart
              data={salesData}
              lines={[
                { dataKey: 'sales', stroke: '#8884d8', name: '매출' },
                { dataKey: 'profit', stroke: '#82ca9d', name: '수익' },
              ]}
              height={300}
            />
          </div>

          {/* 카테고리별 판매 비중 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">카테고리별 판매 비중</h2>
            <PieChart
              data={categoryData}
              height={300}
            />
          </div>
        </div>

        {/* 바 차트 섹션 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">월별 고객 수 및 매출 비교</h2>
          <BarChart
            data={salesData}
            bars={[
              { dataKey: 'customers', fill: '#8884d8', name: '고객 수' },
              { dataKey: 'sales', fill: '#82ca9d', name: '매출' },
            ]}
            height={400}
          />
        </div>

        {/* 데이터 테이블 섹션 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">사용자 데이터</h2>
          <DataTable
            data={userData}
            columns={userColumns}
            searchable={true}
            sortable={true}
            paginated={true}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
}
