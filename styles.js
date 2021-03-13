import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  appRoot: {
    backgroundColor: '#FFFFFF'
  },
  contentRoot: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  contentRow: {
    flexDirection: 'row',
    marginTop: 20
  },
  contentShortRow: {
    flexDirection: 'row',
    marginTop: 10
  },
  contentCenter: {
    justifyContent: 'center'
  },
  textTitle: {
    fontSize: 50,
    marginTop: 0
  },
  textSubtitle: {
    fontSize: 35
  },
  textBody: {
    fontSize: 20
  },
  textBold: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  inputBox: {
    height: 70,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1
  }
});