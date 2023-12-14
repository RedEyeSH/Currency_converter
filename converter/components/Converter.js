import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function Converter() {
    const [selectFrom, setSelectFrom] = useState("EUR");
    const [selectTo, setSelectTo] = useState("USD");

    const [currency, setCurrency] = useState([]);

    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const apikey = "c6703b1f8af814e931a4c4f1";

    const convert = useCallback(() => {
      if (!amount) {
        setConvertedAmount(null);
        return;
      }
      fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/${selectFrom}`)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRates = data.conversion_rates;
        const conversionRate = exchangeRates[selectTo];

        if (conversionRate) {
          const result = parseFloat(amount) * conversionRate;
          setConvertedAmount(result.toFixed(2));
        }
      })
      .catch((error) => {
        console.error("Error converting currency: ", error);
      });
    }, [amount, selectFrom, selectTo])

    useEffect(() => {
      axios.get(`https://v6.exchangerate-api.com/v6/${apikey}/latest/${selectFrom}`).then((response) => response.data)
        .then((data) => {
          const currencyCode = Object.keys(data["conversion_rates"]);
          setCurrency(currencyCode);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const swapCurrency = () => {
      setSelectFrom(selectTo);
      setSelectTo(selectFrom);

    }

    const clearCurrency = () => {
      setAmount("");
      setConvertedAmount(0);
    }

    return (
      <View style={styles.container}>
          <Text style={styles.header}>Currency Converter</Text>
          <View style={styles.converter}>
              <TextInput 
                style={styles.input} 
                keyboardType='numeric' 
                placeholder='Enter amount' 
                value={amount.toString()} 
                onChangeText={(value) => {setAmount(value)}} 
              />
          </View>
            <View style={styles.currency_content}>
              <View style={styles.currency_1}>
                  <SelectList 
                    key={`${selectFrom}-${selectTo}`}
                    style={styles.select_list} 
                    inputStyles={{width: '35px'}}
                    boxStyles={styles.selectList} 
                    dropdownStyles={{backgroundColor: 'white'}} 
                    dropdownTextStyles={{textAlign: 'center'}} 
                    placeholder={selectFrom} 
                    data={currency} 
                    setSelected={setSelectFrom}
                  />
              </View>
              <TouchableOpacity onPress={swapCurrency}>
                <View style={styles.icon_box}>
                    <FontAwesomeIcon style={styles.icon} icon={faArrowRightArrowLeft} />
                </View>
              </TouchableOpacity>
              <View style={styles.currency_2}>
                  <SelectList 
                    key={`${selectFrom}-${selectTo}`}
                    inputStyles={{width: '35px'}} 
                    boxStyles={styles.selectList} 
                    dropdownStyles={{backgroundColor: 'white'}} 
                    dropdownTextStyles={{textAlign: 'center'}} 
                    placeholder={selectTo} 
                    data={currency} 
                    setSelected={setSelectTo}
                  />
              </View>
          </View>
          <View style={styles.result}>
              <Text style={styles.result_text}>RESULT =</Text>
              <View style={styles.result_box}>
                <Text style={styles.currency_num}>{convertedAmount}</Text>
              </View>
          </View>
          <View style={styles.button_container}>
            <View style={styles.clear_button}>
              <TouchableOpacity style={styles.touch} onPress={clearCurrency}>
                <Text style={styles.button_text}>CLEAR</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.touch} onPress={convert}>
                <Text style={styles.button_text}>CONVERT</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    borderColor: 'white',
    width: '95%',
    marginTop: 40,
    padding: 20,
    backgroundColor: 'rgb(16, 13, 37)',
    borderRadius: 5,
  },
  
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  },

  converter: {
    borderRadius: 10,
    marginTop: 40
  },

  input: {
    width: 340,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    textAlign: 'center'
  },

  currency_content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  currency_1: {

  },

  icon_box: {
    backgroundColor: 'rgb(0, 138, 216)',
    padding: 5,
    borderRadius: 20,
  },

  icon: {
    color: 'white'
  },

  currency_2: {

  },

  select_list: {
    width: 1000
  },

  selectList: {
    backgroundColor: 'white',
    width: 150,
  },

  result: {
    backgroundColor: 'white',
    width: 330,
    height: 200,
    padding: 40,
    borderRadius: 5,
  },

  result_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },

  result_box: {

  },

  currency_num: {
    textAlign: 'center',
    margin: 35,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgb(0, 138, 216)'
  },

  button_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    width: '100%'
  },

  clear_button: {
    backgroundColor: 'red',
    padding: 15,
    // width: '100%',
    borderRadius: 5,
  },

  button: {
    backgroundColor: 'rgb(0, 138, 216)',
    padding: 15,
    // width: '100%',
    borderRadius: 5,
  },

  touch: {
    // width: '100%',
  },

  button_text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  }

});
