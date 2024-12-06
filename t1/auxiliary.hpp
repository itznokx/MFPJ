#pragma once
#include <iostream>
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
// Equalize s1 with s2 (the one with more chars)
std::tuple<std::string,std::string> equalizeN (std::string bin1,std::string bin2){
	int maxL = std::max(bin1.length(),bin2.length());
	std::string s1 = equalize(bin1,maxL);
	std::string s2 = equalize(bin2,maxL);
	return std::make_tuple(s1,s2);
}
// Clean obsolete zeros in result (oposite function of equalize)
std::string cleanResult (std::string n1){
	for (char& c : n1){
		if (c == '1')
			break;
		c = '\0';
	}
	return n1;
}