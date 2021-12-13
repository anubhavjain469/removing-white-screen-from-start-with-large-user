import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { Card } from "react-native-elements";


class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      dataList: [], // To store the data
      loading: false // If its is true it will show activity indicator otherwise it will show the data.
    };

    this.init = this.init.bind(this);
  }

  // This function is fetching data from the api.
  GetData = async (url) => {
    try {
      let apiurl = encodeURI(url);
      let response = await fetch(apiurl);
      return response.json();
    } catch (error) {
      throw error;
    }
  };


    //We made Init async as the other functions should not wait for it complete. I will get data from API and update the state. The State data will then get reloaded on the screen automatically. 
    async init() {
    try {      
      let list = await this.GetData('https://jsonplaceholder.typicode.com/photos');      
      this.setState({ dataList: list.slice(0, 100) });
      this.setState({ loading: false });
    }
    catch (error) {
      alert(error);
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    //We called Init without await becuase the component did mount will do all other work and the data load will work in the background as Init is a async function.
    this.init();

  }


  // main code for rendering the UI.
  render() {
    return (

      // used activity indicator to show that data is loading on the screen as it shows some loading activity on the screen instead of blank screen.

      this.state.loading ? (
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            color={'#922790'} />
        </View>
      ) : (
        <View contentContainerStyle={styles.containerFlex}>
          <ScrollView contentContainerStyle={styles.containerScrollFlex}>
            <View style={styles.headingAndListContainer}>
              <ScrollView horizontal={true}>
                <FlatList
                  numColumns={2}
                  showsVerticalScrollIndicator={true}
                  showsHorizontalScrollIndicator={true}
                  data={this.state.dataList}
                  renderItem={({ item: rowData }) => {                    
                    return (
                      <>
                        <Card containerStyle={styles.cardStyle} >
                          <Text>{rowData.title}</Text>
                        </Card>
                      </>
                    );
                  }}
                  keyExtractor={(item, index) => index} />
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  containerFlex: {
    backgroundColor: "#ffffff",
  },
  containerScrollFlex: {
    backgroundColor: "#ffffff",
  },
  headingAndListContainer: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: '5%',
    paddingTop: '5%',
    paddingBottom: '5%',
    elevation: 3,
    alignItems: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center'
  },
  cardStyle: {
    height: 150,
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    marginTop: '10%',
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 100,
    justifyContent: Platform.OS === 'ios' ? 'center' : 'center',
    alignSelf: 'center'
  },
});



export default App;
