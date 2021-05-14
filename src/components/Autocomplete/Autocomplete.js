import React, { useEffect } from 'react'
import {
  Keyboard,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import PropTypes from 'prop-types'

const getColor = (error, disabled) => {
  if (error) {
    return 'red'
  }

  return disabled ? 'grey' : 'black'
}

const AutocompleteComponent = ({
  value,
  onChange,
  name,
  options,
  label,
  register,
  error,
  disabled,
  placeholder,
  ...props
}) => {
  const filterData = value => {
    if (!value) {
      return []
    }

    return options.filter(element => element.label.toUpperCase().includes(value.toUpperCase()))
  }

  const filteredData = filterData(value)

  useEffect(() => {
    register({ name })
  }, [name, register])

  return (
    <View style={styles.container} {...props}>
      {label && (
        <Text
          style={{ color: getColor(error, disabled) }}
          color={getColor(error, disabled)}
          mb={10}
          fontWeight={600}
        >
          {label}
        </Text>
      )}

      <TextInput
        style={styles.input}
        name={name}
        onChangeText={text => onChange(name, text)}
        value={value}
        editable={!disabled}
        placeholder={placeholder}
        autoCapitalize='none'
      />

      {(filteredData.length > 1 ||
        (filteredData?.[0]?.label && filteredData?.[0]?.label !== value)) &&
        !!value && (
          <View style={[styles.dropDown, { top: label ? 70 : 40 }]}>
            <ScrollView>
              {filteredData?.map(
                item => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(name, item.label)
                      Keyboard.dismiss()
                    }}
                    style={{ marginLeft: 8, marginVertical: 6 }}
                    key={item.id}
                  >
                    <Text mt={10}>{item.label}</Text>
                  </TouchableOpacity>
                ),
                []
              )}
            </ScrollView>
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1
  },

  dropDown: {
    backgroundColor: 'white',
    width: '100%',
    maxHeight: 200,
    borderRadius: 4,
    position: 'absolute'
  },

  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 4
  }
})

AutocompleteComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  register: PropTypes.func,
  options: PropTypes.array
}

export default AutocompleteComponent
