#include <iostream>
#include "basicOperations.hpp"
#include "binaryOperations.hpp"
// Mathematical Binary Operations
std::tuple<char,char> sumAux (char c1,char c2,char v1){
	char sum = xorChar(v1,xorChar(c1,c2));
	char vOut = orChar(andChar(c1,c2),andChar(c1,v1),andChar(c2,v1));
	//printf("%c + %c + %c\n",c1,c2,v1 );printf("sum = %c \nvOut = %c \n\n",sum,vOut);
	return {sum,vOut};
}
// Binary Sum
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
// Binary Subtraction
std::string subBin (std::string n1,std::string n2){
	char v1 = '0';
	std::string finalSum;
	auto [s1,s2] = equalizeN (n1,n2);
	s2 = onesComplement(s2);
	for (int i = s1.length()-1; i>=0;--i){
		auto[sum,vOut] = sumAux(s1[i],s2[i],v1);
		finalSum= sum+finalSum;
		v1 = vOut;
	}
	auto[sum,vOut] = sumAux(s1[0],s2[0],v1);
	finalSum = nextBin(finalSum);
	return finalSum;
}
// Binary Multiplication
std::string timesBin(std::string n1,std::string times){
	std::string counter = "1";
	std::string finalTimes;
	if (stoi(times)==0)
		return "0";
	if (stoi(times)==1)
		return n1;
	finalTimes = n1;
	while (counter != times){
	//	std::cout << counter << std::endl;
		finalTimes = sumBin(finalTimes,n1);
		counter = nextBin(counter);
	}
	return finalTimes;
}
