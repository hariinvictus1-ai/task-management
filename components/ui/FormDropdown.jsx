import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function FormDropdown({
  id,
  label,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  placeholder = 'Select',
  searchable = false,
  zIndex = 1000,
  colors = {},
  activeDropdown,
  setActiveDropdown, 
}) {
  const isActive = activeDropdown && id
    ? activeDropdown === id
    : false;

  return (
    <View style={{ zIndex }}>
      {label && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 6,
            marginTop: 14,
            color: colors.textSecondary,
          }}
        >
          {label}
        </Text>
      )}

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={(val) => {
          setOpen(val);

          if (setActiveDropdown && id) {
            setActiveDropdown(val ? id : null);
          }
        }}
        setValue={setValue}
        setItems={setItems}
        searchable={searchable}
        listMode="SCROLLVIEW"
        placeholder={placeholder}

        style={{
          borderColor: colors.border,
          borderRadius: 12,
          backgroundColor: isActive
            ? `${colors.textPrimary}05` // subtle
            : colors.card,
        }}

        dropDownContainerStyle={{
          borderColor: "#4f4f4fff",
          borderRadius: 12,
          backgroundColor: colors.card,
          maxHeight: 240,
          paddingVertical: 6,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        }}

        listItemContainerStyle={{
          paddingVertical: 10,
        }}

        textStyle={{
          color: colors.textPrimary,
          fontSize: 14,
        }}

        placeholderStyle={{
          color: colors.textSecondary,
        }}

        searchTextInputStyle={{
          borderColor: colors.border,
          color: colors.textPrimary,
        }}

        zIndex={zIndex}
        zIndexInverse={1000}
      />
    </View>
  );
}

export default FormDropdown;
