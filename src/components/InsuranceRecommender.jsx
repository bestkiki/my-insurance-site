import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Compass, Heart, Dog, Car, Home, Baby } from 'lucide-react';

const InsuranceRecommender = () => {
  const [selectedLifestyle, setSelectedLifestyle] = useState(null);
  
  const lifestyleOptions = [
    {
      id: 'travel',
      icon: Compass,
      title: '여행 러버',
      description: '국내외 여행을 자주 다니시는 분',
      insuranceTypes: [
        { name: '해외여행 보험', coverage: '의료비, 휴대품 분실, 항공편 취소' },
        { name: '국내여행 보험', coverage: '상해, 배상책임, 휴대품 손해' }
      ]
    },
    {
      id: 'pet',
      icon: Dog,
      title: '반려동물 집사',
      description: '반려동물과 함께 사는 분',
      insuranceTypes: [
        { name: '펫 의료비 보험', coverage: '수술비, 통원치료비, 입원비' },
        { name: '반려동물 배상책임보험', coverage: '반려동물로 인한 사고 보상' }
      ]
    },
    {
      id: 'health',
      icon: Heart,
      title: '건강 관리족',
      description: '건강과 운동을 중시하는 분',
      insuranceTypes: [
        { name: '종합건강보험', coverage: '입원비, 수술비, 진단비' },
        { name: '운동상해보험', coverage: '운동 중 상해, 치료비' }
      ]
    },
    {
      id: 'driver',
      icon: Car,
      title: '운전자',
      description: '자동차를 운전하시는 분',
      insuranceTypes: [
        { name: '운전자보험', coverage: '사고 처리, 벌금, 변호사 선임비' },
        { name: '자동차보험', coverage: '대인/대물 배상, 자차 손해' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">나의 라이프스타일에 맞는 보험 찾기</h1>
        <p className="text-gray-600">당신의 라이프스타일을 선택하고 맞춤 보험 상품을 확인하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {lifestyleOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all ${
              selectedLifestyle?.id === option.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedLifestyle(option)}
          >
            <CardContent className="p-6 flex items-center space-x-4">
              <option.icon className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-lg">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedLifestyle && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>추천 보험 상품</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedLifestyle.insuranceTypes.map((insurance, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{insurance.name}</h4>
                  <p className="text-gray-600 mb-4">보장: {insurance.coverage}</p>
                  <Button className="w-full">상담 신청하기</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-4">전문 상담사와 상담하기</h3>
        <p className="text-gray-600 mb-4">
          더 자세한 상담이 필요하신가요? 전문 상담사가 도와드립니다.
        </p>
        <Button variant="outline" className="w-full">
          무료 상담 예약하기
        </Button>
      </div>
    </div>
  );
};

export default InsuranceRecommender;