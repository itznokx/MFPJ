#include <iostream>
#include "binary.cpp"

using namespace std;

int main (void){
	string number = "101101";
	if (validation(number) == true)
		cout << "Is Binary" << endl;
	else
		cout << "Not a Binary" << endl << validationWithString(number) << endl << number << endl;
	return 0;
}