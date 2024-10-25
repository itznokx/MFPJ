#include <iostream>
#include <random>
#include <array>
using namespace std;

/*
{
"1","2","3","4","5","6","7","8","9","0","a",
"b","c","d","e","f","g","h","i","j","k","l",
"m","n","o","p","q","r","s","t","u","v","w",
"x","y","z"
}
*/
int randomInt (int,int);
string* randomSet (int);
string* randomSet ();
int randomInt (int min, int max){
	random_device rng_dev;
	mt19937 rng(rng_dev());
	uniform_int_distribution<> distr(min,max);
	return (distr(rng));
}
string* randomSet (int n){
	string strArr[] = 	{
						"1","2","3","4","5","6","7","8","9","0",
						"a","b","c","d","e","f","g","h","i","j",
						"k","l","m","n","o","p","q","r","s","t",
						"u","v","w","x","y","z"
						};
	int strArrSize = sizeof(strArr)/sizeof(strArr[0]);
	string* finalSet = new string[n+1];
	int randN;
	for (int i=0;i<n;i++){
		randN = randomInt(0,strArrSize-1);
		finalSet[i] = strArr[randN];
	}
	return finalSet;
}

string* randomSet (){
	string strArr[] = 	{
						"1","2","3","4","5","6","7","8","9","0",
						"a","b","c","d","e","f","g","h","i","j",
						"k","l","m","n","o","p","q","r","s","t",
						"u","v","w","x","y","z"
					 	};
	int strArrSize = sizeof(strArr)/sizeof(strArr[0]);
	int nran = randomInt(0,6);
	string* finalSet = new string[nran];
	int randN;
	for (int i=0;i<nran;i++){
		randN = randomInt(0,strArrSize-1);
		finalSet[i] = strArr[randN];
	}
	return finalSet;
}


