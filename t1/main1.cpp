#include <iostream>
#include "binary.cpp"

using namespace std;

int main (void){
	string number1 = "111";
	string number2 = "11101110";
	/* // Validation test
	if (validation(number) == true)
		cout << "Is Binary" << endl;
	else
		cout << "Not a Binary" << endl << validationWithString(number) << endl << number << endl;
	*/
	// Sucessor test
	//cout << nextBin(number) << endl;
	//cout << inverseBin (number) << endl;
	auto [s1,s2] = equalizeN(number1,number2);
	cout << s1 << " x" << endl << s2 << endl;
	cout << "-------------------------------" << endl;
	cout << cleanResult(timesBin(number1,number2)) << endl ;
	return 0;
}