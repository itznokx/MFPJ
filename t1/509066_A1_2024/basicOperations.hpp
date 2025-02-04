#pragma once
#include <iostream>
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
std::string onesComplement (std::string binary){
	return inverseBin(binary);
}
std::string twosComplement (std::string binary){
	std::string aux = inverseBin(binary);
	return nextBin(aux);
}