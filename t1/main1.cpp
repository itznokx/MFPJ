#include <iostream>
#include "binary.cpp"

using namespace std;

int main (void){
	string number = "110110111";
	/* // Validation test
	if (validation(number) == true)
		cout << "Is Binary" << endl;
	else
		cout << "Not a Binary" << endl << validationWithString(number) << endl << number << endl;
	*/
	// Sucessor test
	//cout << nextBin(number) << endl;
	cout << inverseBin (number) << endl;
	return 0;
}