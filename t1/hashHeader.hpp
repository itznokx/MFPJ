#include <filesystem>
#include <iostream>

using namespace std;
void printFileHash(filesystem::path const&);
void calculateHash(string);
void printFileHash (filesystem::path const& p){
	cout << "Hash of file: " << filesystem::hash_value(p) << "\n"; 
}
void calculateHash (string filePath){
	string pathF = "/"+filePath;
	auto file = filesystem::path{pathF};
	printFileHash(file);
}