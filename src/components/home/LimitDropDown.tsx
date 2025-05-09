
'use client'

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LimitDropDown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLimit = searchParams.get('limit')

  const handleLimitChange = (val: string) => {
  
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('limit', val);

    router.push(`${pathname}?${updatedParams.toString()}`, { scroll: false });
  };

  return (
    <div className="w-[120px]">
      <Select value={currentLimit || ''} onValueChange={handleLimitChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select limit" />
        </SelectTrigger>
        <SelectContent>
            
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="8">8</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LimitDropDown;
