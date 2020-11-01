import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  appRoot: {
    backgroundColor: '#FFFFFF'
  },
  contentRoot: {
    margin: 50,
  },
  contentRow: {
    flexDirection: 'row',
    marginTop: 50
  },
  contentShortRow: {
    flexDirection: 'row',
    marginTop: 20
  },
  contentCenter: {
    justifyContent: 'center'
  },
  textTitle: {
    fontSize: 50,
    marginTop: 50
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
    height: 150,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1
  }
});