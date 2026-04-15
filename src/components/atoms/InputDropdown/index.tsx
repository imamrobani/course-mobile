import React, { useState } from 'react';
import { Icons } from '@assets';
import { DropdownItem } from '@type/models/common';
import Dropdown from '../Dropdown';
import TextInput from '../TextInput';
import View from '../View';

interface InputDropdownProps {
  label?: string;
  placeholder?: string;
  data: DropdownItem[];
  value: string;
  onSelect: (value: string) => void;
}

const InputDropdown = ({
  label,
  placeholder,
  data,
  value,
  onSelect,
}: InputDropdownProps) => {
  const [isShow, setIsShow] = useState(false);
  const selectedLabel = data.find((item) => item.key === value)?.label;

  const handleSelect = (val: string) => {
    onSelect(val);
    setIsShow(false);
  };

  return (
    <View>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={selectedLabel}
        iconRight={Icons.IcArrowDown}
        editable={false}
        onPress={() => setIsShow(!isShow)}
      />
      <Dropdown
        data={data}
        value={value}
        isShow={isShow}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default InputDropdown;
