#include <iostream>
#include <cmath>
#include <tuple>
// Aux functions
std::string equalize (std::string b1,int x){
	int counter = x-b1.length();

	if (counter > 0){
		std::string aux = "";
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
std::tuple<std::string,std::string> equalizeN (std::string bin1,std::string bin2){
	int maxL = std::max(bin1.length(),bin2.length());
	std::string s1 = equalize(bin1,maxL);
	std::string s2 = equalize(bin2,maxL);
	return std::make_tuple(s1,s2);
}
// Validation Binary functions
bool validationChar (char c){
	if (c == '0' || c=='1'){
		return true;
	}
	return false;
}
bool validation (std::string binary){
	for (int i = 0;i<binary.length();i++){
		if (validationChar(binary[i])==false)
			return false;
	}
	return true;
}
std::string validationWithString (std::string binary){
	std::string aux = "";
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
std::string nextBin (std::string binary){
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
std::string inverseBin (std::string binary){
	for (int i = 0;i<binary.length();i++){
		if (binary[i] == '0')
			binary[i] = '1';
		else
			binary[i] = '0';
	}
	return binary;
}
// 2's complement functions
std::string twosComplement (std::string binary){
	std::string aux = inverseBin(binary);
	return nextBin(aux);
}
// Binary operations auxiliars
char notChar (char c1){
	if (c1=='0')
		return '1';
	else 
		return '0';
}
char andChar (char c1,char c2){
	if (c1=='1'&&c2=='1')
		return '1';
	else
		return '0';
}
char andChar (char c1,char c2,char c3){
	if (c1=='1'&&c2=='1'&&c3=='1')
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
char orChar (char c1,char c2,char c3){
	if (c1=='0'&&c2=='0'&&c3=='0')
		return '0';
	else
		return '1';
}
char orChar (char c1,char c2,char c3,char c4){
	if (c1=='0'&&c2=='0'&&c3=='0'&&c4=='0')
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
// operator overloading

// Binary operations
std::string andBin (std::string bin1,std::string bin2){
	auto [s1,s2] = equalizeN(bin1,bin2);
	std::string final;
	for (int i = 0; i<s1.length();i++){
		final += andChar(s1[i],s2[i]);
	}
	return final;
}
std::string orBin (std::string bin1,std::string bin2){
	auto [s1,s2] = equalizeN(bin1,bin2);
	std::string final;
	for (int i = 0; i<s1.length();i++){
		final += orChar(s1[i],s2[i]);
	}
	return final;
}
std::string xorBin (std::string bin1,std::string bin2){
	auto [s1,s2] = equalizeN(bin1,bin2);
	std::string final;
	for (int i = 0; i<s1.length();i++){
		final += xorChar(s1[i],s2[i]);
	}
	return final;
}
// Mathematical Binary Operations
std::tuple<char,char> sumAux (char c1,char c2,char v1){
	char sum = xorChar(v1,xorChar(c1,c2));
	char vOut = orChar(andChar(c1,c2),andChar(c1,v1),andChar(c2,v1));
	//printf("%c + %c + %c\n",c1,c2,v1 );printf("sum = %c \nvOut = %c \n\n",sum,vOut);
	return {sum,vOut};
}
// Sum
std::string sumBin (std::string n1,std::string n2){
	char v1 = '0';
	std::string finalSum;
	auto [s1,s2] = equalizeN (n1,n2);
	for (int i = s1.length()-1; i>=0;--i){
		auto[sum,vOut] = sumAux(s1[i],s2[i],v1);
		finalSum= sum+finalSum;
		v1 = vOut;
	}
	auto[sum,vOut] = sumAux(s1[0],s2[0],v1);
	finalSum=vOut+finalSum;
	return finalSum;
}