#include <iostream>
#include "binary.cpp"

using namespace std;

int main (void){
	string number1 = "10101010";
	string number2 = "11001100";
	/* // Validation test
	if (validation(number) == true)
		cout << "Is Binary" << endl;
	else
		cout << "Not a Binary" << endl << validationWithString(number) << endl << number << endl;
	*/
	// Sucessor test
	//cout << nextBin(number) << endl;
	//cout << inverseBin (number) << endl;
	cout << sumBin(number1,number2) << endl ;
	return 0;
}