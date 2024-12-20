import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const ConsultationForm = ({ isOpen, onClose, defaultInsuranceType = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    insuranceType: defaultInsuranceType, // 기본값 설정
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbytUzayeNTxxkf4ogicaR1jod8G_OjoyL3YpdiC6KoTI_MAkF7OFanR22wLu_KAS-yg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData)
      });
  
      // no-cors 모드에서는 성공으로 간주
      alert('상담 신청이 완료되었습니다. 곧 연락드리겠습니다.');
      onClose();
      setFormData({
        name: '',
        phone: '',
        email: '',
        insuranceType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle>무료 상담 신청</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">연락처</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">관심 보험 종류</label>
              <select
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">선택해주세요</option>
                <option value="travel">여행자 보험</option>
                <option value="pet">펫 보험</option>
                <option value="health">건강 보험</option>
                <option value="car">자동차 보험</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">문의사항</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded h-24"
              />
            </div>
            <div className="flex space-x-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? '제출 중...' : '신청하기'}
              </Button>
              <Button 
                type="button" 
                onClick={onClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600"
              >
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationForm;