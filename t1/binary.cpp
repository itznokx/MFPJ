#include <iostream>

using namespace std;
// Validation Binary functions
bool validationChar (char c){
	if (c == '0' || c=='1'){
		return true;
	}
	return false;
}
bool validation (string binary){
	for (int i = 0;i<binary.length();i++){
		if (validationChar(binary[i])==false)
			return false;
	}
	return true;
}
string validationWithString (string binary){
	string aux = "";
	for (int i = 0;i<binary.length();i++){
		if (validationChar(binary[i])==false){
			aux += "v";
		}
		else{
			aux += " ";
		}
	}
	return aux;
}
// Sucessor Binary function
string nextBin (string bin){
	int i;
	for (i = bin.length()-1;i >= 0; i--){
		if (bin[i] == '0'){
			bin[i] = '1';
			break;
		}
		else
			bin[i] = '0';
	}
	if (i < 0){
		bin = "1"+bin;
	}
	return bin;
}