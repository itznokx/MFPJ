#include <iostream>
#include "binary.cpp"

using namespace std;

int main (void){
	string number1 = "9";
	string number2 = "9";
	string choice;
	while(validation(number1)!=true){
		printf("Digite o primeiro numero binario: ");
		cin >> number1;
	}
	while(validation(number2)!=true){
		printf("Digite o primeiro segundo binario: ");
		cin >> number2;
	}
	printf("Digite a operação que você deseja fazer:\n0 - AND\n1 - OR\n2 - XOR\n3 - Soma\n4 - Subtracao\n5 - Multiplicacao\n");
	cin >> choice;
	cout 	<< "Numeros digitados:\n"
			<< "n1: " << number1 << endl
		 	<< "n2: " << number2 << endl
		 	<< "Escolha: " << choice << endl;
	auto [s1,s2] = equalizeN(number1,number2);
	switch (stoi(choice)){
		case 0:
			cout << s1 << " AND\n" << s2 << endl << "---------------------" << endl << cleanResult(andBin(number1,number2)) << endl;
			break;
		case 1:
			cout << s1 << " OR\n" << s2 << endl << "---------------------" << endl << cleanResult(orBin(number1,number2)) << endl;
			break;
		case 2:
			cout << s1 << " XOR\n" << s2 << endl << "---------------------" << endl << cleanResult(xorBin(number1,number2)) << endl;
			break;
		case 3:
			cout << s1 << " +\n" << s2 << endl << "---------------------" << endl << cleanResult(sumBin(number1,number2)) << endl;
			break;
		case 4:
			cout << s1 << " -\n" << s2 << endl << "---------------------" << endl << cleanResult(subBin(number1,number2)) << endl;
			break;
		case 5:
			cout << s1 << " X\n" << s2 << endl << "---------------------" << endl << cleanResult(timesBin(number1,number2)) << endl;
			break;
		default:
			cout << "Invalid operation" << endl;
			break;

	}
}