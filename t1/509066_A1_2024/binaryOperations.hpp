#pragma once
#include <iostream>
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