// This header contains the set and partitions functions
#include <fstream>
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

void printPartition (vector<string>);
vector<string> allSetPartition(string*,string);
int sizeOfArray(string*);

int sizeOfArray (string* arr){
	int i = 0;
	while (arr[i]!=""){
		i++;
	}
	return i;
}
void printPartition (vector<string> v){
	vector<string>::iterator iter;
	for (iter = v.begin();iter!=v.end();iter++){
		cout << *iter << "\n";
	}
}
vector<string> allSetPartition (string* set,string fileName){
	ofstream outFile(fileName);
	vector<string> allSubsets;
	allSubsets.push_back("{ ø }");
	string aux;
	int arrSize = sizeOfArray(set);
	for (int i = 1; i < pow(2,arrSize);i++){
		aux = "";
		aux += "{ ";
		for (int j = 0; j<arrSize; j++){
			if (i & (1 << j))
				aux += set[j] + " ";
		}
		aux += "}";
		outFile << aux << "\n";
		allSubsets.push_back(aux);
	}
	outFile.close();
	return allSubsets;
} 