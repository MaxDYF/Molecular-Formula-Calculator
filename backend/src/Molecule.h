#ifndef MOLECULE_H
#define MOLECULE_H

#include "Element.h"
#include "PTable.h"
#include <unordered_map>
#include <string>
#include <string_view>

class Molecule {
protected:
	std::unordered_map<int16_t, int> elems; // 储存该分子含有多少个这种原子
	float totWeight; // 分子量

public:
	Molecule();
	virtual ~Molecule();
	void join(const Element& obj);
	void join(const Molecule& obj); // 与其他分子合并
	float getWeight();
	void multiply(int mul);
	void parseFromString(PTable &table, std::string_view str);
	std::unordered_map<std::string, int> getElements(PTable &table);
};

#endif // MOLECULE_H