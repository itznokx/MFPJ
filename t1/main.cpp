#pragma once
#include "setsCpp.hpp"
#include "randomF.hpp"
using namespace std;

int main (int narg, char** argv){
	string* set = new string[100];
	/*
	//Random set with n contents
	set = randomSet(3);
	//Random set with (n<6)contents: max 2^6 contents
	*/
	// a)
	set[0] = "a";set[1] = "b";
	// b)
	// set[0] = "1";set[1] = "2"; set[2] = "3";

	cout << "Array size: " <<sizeOfArray(set)<< "\n";
	cout << "Array: ";
	for (int i=0;i<sizeOfArray(set);i++){
		cout << set[i] << " ";
	}
	cout << "\n";
	printPartition(allSetPartition(set));
	return 0;
}
