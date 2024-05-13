import React, { useState } from 'react';
import {Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';


const DropdownInput = ({
  otherStyles,
  title
}) => {
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className= "text-base text-white font-pmedium">{title}</Text>
        <View className="w-full h-16 px-4 justify-center rounded-2xl border-2 border-black-200 focus:border-secondary">
          <DropDownPicker
            className='bg-black'
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            itemSeparator={false}
            placeholder='Select item'
            translation={{
              PLACEHOLDER: "Select an item"
            }}
            labelStyle= {{color:"white"}}
            dropDownContainerStyle={{
              backgroundColor: 'black',
              borderColor: 'orange',
            }}
            // selectedItemContainerStyle={{
            //   backgroundColor: "grey",
            // }}
            listItemLabelStyle={{
            color: "white"
            }}
            selectedItemLabelStyle={{
            fontWeight: "bold"
            }}
            closeAfterSelecting={true}
            activeLabelStyle={{ color: 'green' }}
            // itemSeparatorStyle={{
            //   backgroundColor: "white"
            // }}
            placeholderStyle={{
              color: "grey",
              fontWeight: "bold"
            }}
          />
        </View>
    </View>
  )
}

export default DropdownInput