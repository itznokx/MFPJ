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
string nextBin (string binary){
	int i;
	for (i = binary.length()-1;i >= 0; i--){
		if (binary[i] == '0'){
			binary[i] = '1';
			break;
		}
		else
			binary[i] = '0';
	}
	if (i < 0){
		binary = "1"+binary;
	}
	return binary;
}
string inverseBin (string binary){
	for (int i = 0;i<binary.length();i++){
		if (binary[i] == '0')
			binary[i] = '1';
		else
			binary[i] = '0';
	}
	return binary;
}
string twosComplement (string binary){
	string aux = inverseBin(binary);
	return nextBin(aux);
}