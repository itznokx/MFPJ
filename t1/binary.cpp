#include <iostream>
#include <cmath>
#include <tuple>
using namespace std;
// Aux functions
string equalize (string b1,int x){
	int counter = x-b1.length();

	if (counter > 0){
		string aux = "";
		while (counter > 0){
			aux += '0';
			--counter;
		}
		aux+=b1;
		return aux;
	}
	else{
		return b1;
	}
}
tuple<string,string> equalizeN (string bin1,string bin2){
	int maxL = max(bin1.length(),bin2.length());
	string s1 = equalize(bin1,maxL);
	string s2 = equalize(bin2,maxL);
	return std::make_tuple(s1,s2);
}
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
// Binary operations auxiliars
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
// Binary operations
string andBin (string bin1,string bin2){
	auto [s1,s2] = equalizeN(bin1,bin2);
	string final;
	for (int i = 0; i<s1.length();i++){
		final += andChar(s1[i],s2[i]);
	}
	return final;
}
string orBin (string bin1,string bin2){
	auto [s1,s2] = equalizeN(bin1,bin2);
	string final;
	for (int i = 0; i<s1.length();i++){
		final += orChar(s1[i],s2[i]);
	}
	return final;
}
string xorBin (string bin1,string bin2){
	auto [s1,s2] = equalizeN(bin1,bin2);
	string final;
	for (int i = 0; i<s1.length();i++){
		final += xorChar(s1[i],s2[i]);
	}
	return final;
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