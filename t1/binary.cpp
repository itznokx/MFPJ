#include <iostream>
#include <tuple>
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
// Inverse Binary function
string inverseBin (string binary){
	for (int i = 0;i<binary.length();i++){
		if (binary[i] == '0')
			binary[i] = '1';
		else
			binary[i] = '0';
	}
	return binary;
}
// 2's complement functions
string twosComplement (string binary){
	string aux = inverseBin(binary);
	return nextBin(aux);
}
// Binary operations
char andChar (char c1,char c2){
	if (c1=='1'&&c2=='1')
		return '1';
	else
		return '0';
}
char orChar (char c1,char c2){
	if (c1=='0'&&c2=='0')
		return '0';
	else
		return '1';
}
char xorChar(char c1,char c2){
	if (c1==c2)
		return '0';
	else
		return '1';
}
// Mathematical Binary Operations
tuple<char,int> sumAux (char c1,char c2,int v1){
	if (c1 == '1' && c2 == '1'){
		if (v1 == 1)
			return {'1',1};
		else
			return {'0',1};
	}
	if (c1=='0' && c2 == '0'){
		if (v1 == 1)
			return {'1',0};
		else
			return {'0',0};
	}
	if (v1 == 1)
		return {'0',1};
	else
		return {'1',0};
}
string sumBin (string n1,string n2){
	string aux = "";
	return aux;
}